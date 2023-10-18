import React, { useCallback, useEffect } from "react";
import * as RemoteData from "@devexperts/remote-data-ts";
import { Icon } from "../../components/icons/Icon";
import { getFrames } from "../../helpers/figma";
import { usePersistantState } from "../../hooks/usePersistantState";
import { useSocket } from "../../hooks/useSocket";
import { fromRemoteData } from "../../helpers/remoteData";
import { pipe } from "fp-ts/lib/function";

type Props = {
  file: string;
};

type Images = Record<
  string,
  RemoteData.RemoteData<Error, { image: string; name: string }[]>
>;

export function FigmaFrames({ file }: Props) {
  const [images, setImages] = usePersistantState<Images>("AMBIANCE_IMAGES", {});
  const [selectedView, setSelectedView] = usePersistantState<
    string | undefined
  >("AMBIANCE_SELECTED_IMAGE", undefined);
  const { emit } = useSocket();

  const fetch = useCallback((file: string) => {
    setImages({ ...images, [file]: RemoteData.pending });
    getFrames(file.trim())
      .then((frames) => {
        setImages({ ...images, [file]: RemoteData.success(frames) });
      })
      .catch((e) => {
        console.error(e);
        setImages({
          ...images,
          [file]: RemoteData.failure(
            new Error("Can't get frames from given file")
          ),
        });
      });
  }, []);

  useEffect(() => {
    if (file && !(file in images)) {
      fetch(file);
    }
  }, [fetch, file]);

  useEffect(() => {
    emit({
      type: "image",
      payload: selectedView,
    });
  }, [emit, selectedView]);

  return (
    <div className="flex flex-wrap p-2">
      <div
        onClick={() => setSelectedView(undefined)}
        className="p-2 m-1 border border-white rounded"
        style={{
          height: "25vmin",
          width: "25vmin",
          color: "green",
          background: "black",
        }}
      >
        {selectedView == null && (
          <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full">
            <Icon name="CHECK" />
          </div>
        )}
      </div>
      {pipe(
        images[file] ?? RemoteData.initial,
        fromRemoteData(
          (images) => (
            <>
              {images.map(({ image, name }) => (
                <div key={name}>
                  <div
                    onClick={() => setSelectedView(image)}
                    className="p-2 m-1 mb-0 border border-white rounded-t"
                    key={image}
                    style={{
                      height: "25vmin",
                      width: "25vmin",
                      color: "green",
                      background: `url(${image}) center`,
                      backgroundSize: "cover",
                    }}
                  >
                    {selectedView === image && (
                      <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full">
                        <Icon name="CHECK" />
                      </div>
                    )}
                  </div>
                  <div
                    className="flex justify-center m-1 mt-0 text-white bg-gray-700 border border-t-0 border-white rounded-b"
                    style={{ width: "25vmin" }}
                  >
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {name}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ),
          () => <></>
        )
      )}
    </div>
  );
}
