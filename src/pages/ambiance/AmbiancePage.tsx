import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { FigmaFrames } from './FigmaFrames';

export function AmbiancePage(){
  const [file, setFile] = useState(sessionStorage.getItem('figmaFile') ?? '');
  const { handleSubmit, control } = useForm<{file: string}>({
    defaultValues: {
      file,
    },
  });

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
      <FigmaFrames file={file}/>
    </div>
  </Layout>;
}