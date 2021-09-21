import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as RX from 'rxjs/operators';
import { Avatar } from '../../components/Avatar';
import { BodyText } from '../../components/font/BodyText';
import { Comment } from '../../components/font/Comment';
import { Icon } from '../../components/icons/Icon';
import { isDefined } from '../../helpers/nullable';
import { useSocket } from '../../hooks/useSocket';
import { isChatMessage } from '../../message';

let uid1 = 0;
let uid2 = 0;

type Message = {
  id: string;
  isSelf: boolean;
  text: string;
  date: Date;
}

export function ChatBox ({user, image}: {user: string, image: string | null | undefined}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { stream, emit } = useSocket();

  const { handleSubmit, setValue, control } = useForm<{text: string}>({
    defaultValues: {text: ''},
  });

  const send = (message: {text: string}) => {
    const text = message.text.trim();
    if(text) {
      setMessages([{id: `${uid2++}`, isSelf: true, text, date: new Date()}, ...messages]);
      emit({
        type: 'chat',
        payload: {
          message: text,
          needsConfirmation: false,
          recipient: user,
        }
      });
      setValue('text', '');
    }
  };

  const uuid = `${uid1++}_chat`;

  useEffect(() => {
    const subscription = stream
      .asObservable()
      .pipe(
        RX.skip(1), // removes the automatic subscribe event
        RX.filter(isDefined),
        RX.map(message => message.message),
        RX.filter(isChatMessage),
        RX.distinctUntilChanged(),
        RX.timestamp()
      )
      .subscribe({next: ({timestamp, value: {payload:{ message: text}}}) => {
        setMessages([{id: `${timestamp}`, isSelf: false, text, date: new Date()}, ...messages]);
      }});
    return () => subscription.unsubscribe();
  }, [messages, stream]);

  return (
    <div style={{position: 'relative', display:'flex', flexDirection: 'column', alignItems: 'center', filter:'drop-shadow(0 0.25rem 0.5rem rgba(0,0,0,0.25))', transform: isVisible ? 'translateY(0)' : 'translateY(calc(-100% + 4.75rem))', transition: 'transform ease-in-out 0.2s'}}>
      <div style={{background: 'white', minWidth: '8rem', padding: '0.125rem 0.5rem 1.5rem', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem', pointerEvents: 'auto'}}>
        <div className="p-2 my-2 bg-gray-100 rounded" style={{width: '100%', height: '10rem', overflow: 'auto'}}>
          {
            messages.map(({id, isSelf, text, date}) => (
              <div key={id}>
                <div><Comment>{isSelf ? 'Moi' : user} à {date.getHours()}:{date.getMinutes()}</Comment></div>
                <BodyText>{text}</BodyText>
              </div>
            ))
          }
        </div>
        <form className="border-2 rounded border-gray" onSubmit={handleSubmit(send)}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={(props) => <input id={uuid} className="px-2 py-1" type="text" {...props} />}
          />
          <button  type="submit" className="px-2 py-1 border-l-2 border-gray">
            <Icon name="PAPER_PLANE" />
          </button>
        </form>
        <div className="text-center">
          <BodyText>{user}</BodyText>
        </div>
      </div>
      <svg
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
      <div style={{position: 'absolute', bottom: '0.25rem', left: '50%', cursor: 'pointer', transform: 'translateX(-50%)', pointerEvents: 'auto'}}>
        <Avatar url={image} text={user} onClick={() => setIsVisible(!isVisible)} icon={isVisible ? 'UP' : 'DOWN'} />
      </div>
    </div>
  );
}