import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as RX from 'rxjs/operators';
import { Avatar } from '../../components/Avatar';
import { AvatarList } from '../../components/AvatarList';
import { BodyText } from '../../components/font/BodyText';
import { Comment } from '../../components/font/Comment';
import { RichText } from '../../components/font/RichText';
import { Icon } from '../../components/icons/Icon';
import { isDefined } from '../../helpers/nullable';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
import { useList } from '../../hooks/useList';
import { useSocket } from '../../hooks/useSocket';
import { ChatMessage, isChatMessage } from '../../message';
import { State } from '../../store/State';

let uid1 = 0;
let uid2 = 0;

type Message = {
  id: string;
  user: {
    name: string;
    image: string | null | undefined;
  };
  text: string;
  date: Date;
}

type Props = {
  as?: keyof JSX.IntrinsicElements,
  me: State['user'],
  user?: string,
  image: string | null | undefined
};
export function ChatBox ({me, user, image, as: As = 'div'}: Props) {
  const {list: messages, prepend} = useList<Message>();
  const [isVisible, setIsVisible] = useState(false);
  const { stream, emit } = useSocket();
  const { connectedUsers } = useConnectedUsers();

  const { handleSubmit, setValue, control } = useForm<{text: string}>({
    defaultValues: {text: ''},
  });

  const send = (message: {text: string}) => {
    const text = message.text.trim();
    if(text) {
      prepend({id: `${uid2++}`, user: {name: me.name, image: me.imageUrl}, text, date: new Date()});
      emit({
        type: 'chat',
        payload: {
          message: text,
          needsConfirmation: false,
          recipient: user || 'all',
        }
      });
      setValue('text', '');
    }
  };

  const uuid = `${uid1++}_chat`;

  const players = Object.entries(connectedUsers)
    .filter(([name]) => name !== me.name)
    .map(([text, url]) => ({text, url}));

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.skip(1), // removes the automatic subscribe event
        RX.filter(isDefined),
        RX.filter(({author}) => author.name === user || user === 'all'),
        RX.filter(({message}) => isChatMessage(message)),
        RX.map(({author, message}) => ({
          author,
          message: message as ChatMessage,
        })),
        RX.filter(({message}) => !/\[.*\]/g.test(message.payload.message)),
        RX.filter(({message: {payload: { recipient }}}) => recipient === me.name || (recipient === 'all' && user === 'all')),
        RX.distinctUntilChanged(),
        RX.timestamp()
      )
      .subscribe({next: ({timestamp, value: {author, message:{payload:{ message: text}}}}) => {
        prepend({id: `${timestamp}`, user: {name: author.name, image: author.avatar}, text, date: new Date()});
      }});
    return () => subscription.unsubscribe();
  }, [prepend, stream, user, me]);

  return (
    <As
      style={{
        position: 'relative',
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        filter:'drop-shadow(0 0.25rem 0.5rem rgba(0,0,0,0.25))',
        transform: isVisible ? 'translateY(0)' : 'translateY(calc(-100% + 4.75rem))',
        transition: 'transform ease-in-out 0.2s',
        minWidth: '5rem',
        maxWidth: '15rem',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '0.125rem 0.5rem 1.5rem',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          pointerEvents: 'auto',
          width: '100%',
        }}
      >
        <div
          className="p-2 my-2 bg-gray-100 rounded"
          style={{
            width: '100%',
            height: '10rem',
            overflowY: 'auto',
            wordBreak: 'break-word',
          }}
        >
          {
            messages
              .sort((a, b) => {
                if(a.date > b.date) {
                  return -1;
                }
                if(b.date > a.date) {
                  return 1;
                }
                return 0;
              })
              .map(({id, user, text, date}) => (
                <div key={id}>
                  <Comment>
                    <div className="flex items-center space-x-1">
                      <Avatar size="small" url={user.image} text={user.name || ''} />
                      <span className="flex-grow">{user.name}</span>
                      <span style={{fontSize: '0.66rem'}}>à {date.getHours()}:{date.getMinutes()}</span>
                    </div>
                  </Comment>
                  <BodyText>
                    <RichText>{text}</RichText>
                  </BodyText>
                </div>
              ))
          }
        </div>
        <form className="flex flex-row w-full border-2 rounded border-gray" onSubmit={handleSubmit(send)}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={(props) => <input id={uuid} className="flex-grow flex-shrink w-full px-2 py-1" type="text" {...props} />}
          />
          <button  type="submit" className="flex-grow-0 px-2 py-1 border-l-2 w-fit border-gray">
            <Icon name="PAPER_PLANE" />
          </button>
        </form>
        <div className="text-center">
          <BodyText>{user === 'all' ? 'Tout le monde' : user}</BodyText>
        </div>
      </div>
        {
          user !== 'all'
          ? <svg
              width={92}
              height={28}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0c9.941 0 17.622 8.833 23.587 16.786C28.695 23.595 36.833 28 46 28s17.305-4.405 22.413-11.214C74.378 8.833 82.059 0 92 0H0z"
                fill="#FFFFFF"
              />
            </svg>
            : <div style={{background: '#FFF', height: '28px', borderBottomLeftRadius: '100%', borderBottomRightRadius: '100%'}}></div>
      }
      <div style={{position: 'absolute', bottom: '0.25rem', left: '50%', cursor: 'pointer', transform: 'translateX(-50%)', pointerEvents: 'auto'}}>
        {
          user === 'all'
            ? <AvatarList avatars={players} onClick={() => setIsVisible(!isVisible)} icon={isVisible ? 'UP' : 'DOWN'} />
            : <Avatar size="small" url={image} text={user || ''} onClick={() => setIsVisible(!isVisible)} icon={isVisible ? 'UP' : 'DOWN'} />
        }
      </div>
    </As>
  );
}