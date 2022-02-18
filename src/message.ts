import * as IO from 'io-ts';
import { formatValidationErrors } from 'io-ts-reporters';
import { pipe, constVoid } from 'fp-ts/function';
import * as Either from 'fp-ts/Either';

const hasAlreadyJoinMessageDecoder = IO.type({
  type: IO.literal('hasAlreadyJoined'),
  payload: IO.type({
    recipient: IO.string,
  }),
});
export type HasAlreadyJoinedMessage = IO.TypeOf<typeof hasAlreadyJoinMessageDecoder>;

const joinMessageDecoder = IO.type({
  type: IO.literal('join'),
  payload: IO.undefined,
});
export type JoinMessage = IO.TypeOf<typeof joinMessageDecoder>;

const quitMessageDecoder = IO.type({
  type: IO.literal('quit'),
  payload: IO.type({
    name: IO.string,
  }),
});
export type QuitMessage = IO.TypeOf<typeof quitMessageDecoder>;

const rollMessageDecoder = IO.type({
  type: IO.literal('roll'),
  payload: IO.type({
    title: IO.string,
    value: IO.number,
    type: IO.union([
      IO.literal('critical-success'),
      IO.literal('success'),
      IO.literal('failure'),
      IO.literal('critical-failure'),
      IO.literal('free-throw'),
    ]),
  }),
});
export type RollMessage = IO.TypeOf<typeof rollMessageDecoder>;

const chatDecoder = IO.type({
  type: IO.literal('chat'),
  payload: IO.type({
    recipient: IO.string,
    message: IO.string,
    needsConfirmation: IO.boolean,
  })
});
export type ChatMessage = IO.TypeOf<typeof chatDecoder>;
export const isChatMessage = chatDecoder.is;

const alertDecoder = IO.type({
  type: IO.literal('alert'),
  payload: IO.type({
    type: IO.union([
      IO.literal('playerIsAsleep'),
      IO.literal('playerNeedsPause'),
    ])
  })
});
export type AlertMessage = IO.TypeOf<typeof alertDecoder>;

const timeMessageDecoder = IO.type({
  type: IO.literal('time'),
  payload: IO.number,
});
export type TimeMessage = IO.TypeOf<typeof timeMessageDecoder>;
export const isTimeMessage = timeMessageDecoder.is;


const imageDecoder = IO.type({
  type: IO.literal('image'),
  payload: IO.union([IO.string, IO.undefined]),
});
export type ImageMessage = IO.TypeOf<typeof imageDecoder>;
export const isImageMessage = imageDecoder.is;

const useBennyDecoder = IO.type({
  type: IO.literal('useBenny'),
});
export type UseBennyMessage = IO.TypeOf<typeof useBennyDecoder>;
export const isUseBennyMessage = useBennyDecoder.is;

const playMusicDecoder = IO.type({
  type: IO.literal('playMusic'),
  payload: IO.type({
    name: IO.string,
    url: IO.string
  })
});
export type PlayMusicMessage = IO.TypeOf<typeof playMusicDecoder>;

const stopMusicDecoder = IO.type({
  type: IO.literal('stopMusic'),
});
export type StopMusicMessage = IO.TypeOf<typeof playMusicDecoder>;

const messageDecoder = IO.type({
  author: IO.type({
    name: IO.string,
    avatar: IO.union([IO.string, IO.undefined, IO.null]),
  }),
  message: IO.union([
    hasAlreadyJoinMessageDecoder,
    joinMessageDecoder,
    quitMessageDecoder,
    rollMessageDecoder,
    chatDecoder,
    alertDecoder,
    timeMessageDecoder,
    imageDecoder,
    useBennyDecoder,
    playMusicDecoder,
    stopMusicDecoder,
  ])
});

export type Message = IO.TypeOf<typeof messageDecoder>;


const shouldFilterSelfMessage = (currentUserName: string) => (message: Message) => {
  const messagesAvailableForSelf = [
    imageDecoder.is,
    playMusicDecoder.is,
    stopMusicDecoder.is,
  ];

  return message.author.name === currentUserName
    ? messagesAvailableForSelf.reduce((acc, filterMessage) => acc || filterMessage(message.message), false)
    : true;
}

export const fold = (currentUserName: string, fns: {
  hasAlreadyJoined: (payload: HasAlreadyJoinedMessage['payload'], author: Message['author']) => void, 
  join: (payload: JoinMessage['payload'], author: Message['author']) => void,
  quit: (payload: QuitMessage['payload'], author: Message['author']) => void,
  roll: (payload: RollMessage['payload'], author: Message['author']) => void,
  chat: (payload: ChatMessage['payload'], author: Message['author']) => void,
  alert: (payload: AlertMessage['payload'], author: Message['author']) => void,
  time: (payload: TimeMessage['payload'], author: Message['author']) => void,
  image: (payload: ImageMessage['payload'], author: Message['author']) => void,
  useBenny: (payload: undefined, author: Message['author']) => void,
  playMusic: (payload: PlayMusicMessage['payload'], author: Message['author']) => void,
  stopMusic: (payload: undefined, author: Message['author']) => void,
}) => (message: unknown) => pipe(
  message,
  (m) => {
    console.log('received', m)
    return m;
  },
  messageDecoder.decode,
  Either.mapLeft((e) => {
    console.log('error', message, formatValidationErrors(e));
    return Either.left('Wrong encoding');
  }),
  Either.filterOrElse(
    shouldFilterSelfMessage(currentUserName),
    () => Either.left('Same user'),
  ),
  Either.fold(
    constVoid,
    (data) => {
      if (hasAlreadyJoinMessageDecoder.is(data.message)) {
        fns.hasAlreadyJoined(data.message.payload, data.author);
      }
      if (joinMessageDecoder.is(data.message)) {
        fns.join(data.message.payload, data.author);
      }
      if (quitMessageDecoder.is(data.message)) {
        fns.quit(data.message.payload, data.author);
      }
      if(rollMessageDecoder.is(data.message)) {
        fns.roll(data.message.payload, data.author);
      }
      if(chatDecoder.is(data.message)) {
        fns.chat(data.message.payload, data.author);
      }
      if(alertDecoder.is(data.message)) {
        fns.alert(data.message.payload, data.author);
      }
      if(timeMessageDecoder.is(data.message)) {
        fns.time(data.message.payload, data.author);
      }
      if(imageDecoder.is(data.message)) {
        fns.image(data.message.payload, data.author);
      }
      if(useBennyDecoder.is(data.message)) {
        fns.useBenny(undefined, data.author);
      }
      if(playMusicDecoder.is(data.message)) {
        fns.playMusic(data.message.payload, data.author);
      }
      if(stopMusicDecoder.is(data.message)) {
        fns.stopMusic(undefined, data.author);
      }
    }
  )
);
