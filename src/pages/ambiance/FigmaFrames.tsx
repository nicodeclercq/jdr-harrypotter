import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '../../components/icons/Icon';
import { getFrames } from '../../helpers/figma';
import { useSocket } from '../../hooks/useSocket';

type Props = {
  file: string;
}

let _images: string[] = [];

export function FigmaFrames({file}: Props){
  const [images, setImages] = useState<string[]>(_images);
  const [selectedView, setSelectedView] = useState<string | undefined>();
  const { emit } = useSocket();

  const fetch = useCallback((file: string) => {
    const trimed = file.trim();
    sessionStorage.setItem('figmaFile', trimed);
    if (trimed) {
      getFrames(trimed)
        .then((frames) => {
          _images = frames;
          setImages(frames);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, []);

  useEffect(() => {
    fetch(sessionStorage.getItem('figmaFile') ?? '');
  }, [fetch]);

  useEffect(() => {
    fetch(file)
  }, [file, fetch]);

  useEffect(() => {
    emit({
      type: 'image',
      payload: selectedView,
    })
  },[emit, selectedView]);


  return (
    <div className="flex flex-wrap p-2">
        <div
          onClick={() => setSelectedView(undefined)}
          className="p-2 m-1 border border-white rounded"
          style={{height: '25vmin', width:'25vmin', color:'green', background: 'black'}}
        >
          {
            selectedView == null && (
              <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full">
                <Icon name="CHECK"/>
              </div>
            )}
        </div>
        {
          images.map(image => (
            <div
              onClick={() => setSelectedView(image)}
              className="p-2 m-1 border border-white rounded"
              key={image}
              style={{height: '25vmin', width:'25vmin', color:'green', background: `url(${image}) center`, backgroundSize: 'cover'}}
            >
              {selectedView === image && <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full"><Icon name="CHECK"/></div>}
            </div>)
          )
        }
      </div>
  )
}