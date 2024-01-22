import * as IO from "io-ts";
import * as Either from "fp-ts/Either";
import { identity } from "fp-ts/function";

import { secrets } from "../secrets";

const log =
  (msg: string) =>
  <A>(a: A) => {
    console.log(msg, a);
    return a;
  };

const componentDecoder = IO.type({
  type: IO.literal("COMPONENT"),
});

const frameDecoder = IO.type({
  id: IO.string,
  name: IO.string,
  type: IO.literal("FRAME"),
});
type Frame = IO.TypeOf<typeof frameDecoder>;

const canvasDecoder = IO.type({
  id: IO.string,
  name: IO.string,
  type: IO.literal("CANVAS"),
  children: IO.array(IO.union([frameDecoder, componentDecoder])),
});

const documentDecoder = IO.type({
  id: IO.string,
  name: IO.literal("Document"),
  type: IO.literal("DOCUMENT"),
  children: IO.array(canvasDecoder),
});

const fileDecoder = IO.type({
  document: documentDecoder,
});

type File = IO.TypeOf<typeof fileDecoder>;

const imagesDecoder = IO.type({
  images: IO.record(IO.string, IO.string),
});

const findAllFrames = (file: File) =>
  file.document.children.reduce(
    (acc, cur) =>
      acc.concat(
        cur.children.filter(frameDecoder.is).reduce((acc, cur) => {
          acc.push(cur);
          return acc;
        }, [] as Frame[])
      ),
    [] as Frame[]
  );

const getFigmaNode = (fileKey: string, nodeId: string) => {
  return fetch(
    `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png`,
    { headers: { "X-Figma-Token": secrets.figmaApiKey } }
  )
    .then((response) => response.json())
    .then(log("getFigmaNode"));
};

const getFigmaFile = (fileKey: string) => {
  return fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: { "X-Figma-Token": secrets.figmaApiKey },
  })
    .then((response) => response.json())
    .then(log("getFigmaFile"));
};

export const getFrames = (fileKey: string) =>
  getFigmaFile(fileKey)
    .then(fileDecoder.decode)
    .then(Either.map(findAllFrames))
    .then(
      Either.fold((e) => {
        throw e;
      }, identity)
    )
    .then((frames) => {
      const ids = frames.map(({ id }) => id);
      return Promise.allSettled(
        ids.map((id) =>
          getFigmaNode(fileKey, id)
            .then(imagesDecoder.decode)
            .then(
              Either.fold((e) => {
                throw e;
              }, identity)
            )
            .then(log("image"))
            .then((result) => Object.values(result.images))
        )
      )
        .then((result) =>
          result.reduce(
            (acc, cur) =>
              cur.status === "fulfilled" ? [...acc, ...cur.value] : acc,
            [] as string[]
          )
        )
        .then((images) =>
          images.map((image, index) => ({ image, name: frames[index].name }))
        );
    });
