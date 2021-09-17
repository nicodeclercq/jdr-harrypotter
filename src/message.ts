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
    type: IO.union([IO.literal('success'), IO.literal('failure')]),
    value: IO.number,
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
  ])
});

export type Message = IO.TypeOf<typeof messageDecoder>;

export const fold = (currentUserName: string, fns: {
  hasAlreadyJoined: (payload: HasAlreadyJoinedMessage['payload'], author: Message['author']) => void, 
  join: (payload: JoinMessage['payload'], author: Message['author']) => void,
  quit: (payload: QuitMessage['payload'], author: Message['author']) => void,
  roll: (payload: RollMessage['payload'], author: Message['author']) => void,
  chat: (payload: ChatMessage['payload'], author: Message['author']) => void,
  alert: (payload: AlertMessage['payload'], author: Message['author']) => void,
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
    (data) => data.author.name !== currentUserName,
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
    }
  )
);
