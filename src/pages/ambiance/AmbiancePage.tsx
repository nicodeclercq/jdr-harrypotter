import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { Icon } from '../../components/icons/Icon';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { getFrames } from '../../helpers/figma';
import { useSocket } from '../../hooks/useSocket';

export function AmbiancePage(){
  const { emit } = useSocket();
  const [file, setFile] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [images, setImages] = useState<string[]>([]);
  const { handleSubmit, control } = useForm<{file: string}>({
    defaultValues: {
      file: sessionStorage.getItem('figmaFile') ?? '',
    },
  });

  const fetch = useCallback((file: string) => {
    const trimed = file.trim();
    sessionStorage.setItem('figmaFile', trimed);
    if (trimed) {
      getFrames(trimed)
        .then((frames) => {
          console.log(frames);
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
      payload: selectedFile,
    })
  },[emit, selectedFile]);

  const id = uuid();
  const onSubmit = ({file}: {file: string}) => {
    setFile(file);
  }

  return <Layout>
    <div className="flex flex-col space-x-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="file"
          control={control}
          rules={{ required: true, min: 1 }}
          render={({value, onChange}) => (
            <Input
              id={`${id}_file`}
              value={value}
              onChange={onChange}
              onBlur={handleSubmit(onSubmit)}
              width="100%"
              theme="neutral"
              type="text"
            />)}
        />
      </form>
      <div className="flex flex-wrap p-2">
        <div
          onClick={() => setSelectedFile(undefined)}
          className="p-2 m-1 border border-white rounded"
          style={{height: '25vmin', width:'25vmin', color:'green', background: 'black'}}
        >
          {selectedFile == null && <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full"><Icon name="CHECK"/></div>}
        </div>
        {
          images.map(image => (
            <div
              onClick={() => setSelectedFile(image)}
              className="p-2 m-1 border border-white rounded"
              key={image}
              style={{height: '25vmin', width:'25vmin', color:'green', background: `url(${image}) center`, backgroundSize: 'cover'}}
            >
              {selectedFile === image && <div className="flex items-center justify-center inline-block w-5 h-5 bg-white rounded-full"><Icon name="CHECK"/></div>}
            </div>)
          )
        }
      </div>
    </div>
  </Layout>;
}