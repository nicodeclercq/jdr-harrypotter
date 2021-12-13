import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { debounce } from '../../helpers/function';
import { Accordion } from '../../components/Accordion';
import { Button } from '../../components/Button';
import { Label } from '../../components/font/Label';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { useNote } from './useNote';

type Props = {
  id: string;
  title: string;
  description: string;
}

export function Note({id, title, description}: Props) {
  const { setNote, removeNote } = useNote();
  const { handleSubmit, control } = useForm<{title: string, description: string}>({
    defaultValues: {
      title,
      description,
    },
  });

  const onSubmit = ({title, description}: {title: string, description: string}) => {
    console.log('called', description);
    setNote({id, title, description});
  }

  return (
    <form className="border border-gray-200 rounded" onSubmit={handleSubmit(onSubmit)}>
      <Accordion>
        {{
          header: (<div className="flex flex-row items-center p-2 space-x-2 border-b-gray-200">
            <Controller
              name="title"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({value, onChange}) => (
                <Input
                  id={`${id}_title`}
                  value={value}
                  onInput={debounce(handleSubmit(onSubmit), 1000)}
                  onChange={onChange}
                  onBlur={handleSubmit(onSubmit)}
                  width="100%"
                  theme="neutral"
                  type="text"
                />)}
            />
          </div>),
          toggle: <div className="px-2 text-2xl">▾</div>,
          content: (<div className="w-full p-2 grid-cols-1 grid gap-2">
            <Controller
              name="description"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({value, onChange}) => (<div className="flex flex-col">
                <Label htmlFor={`${id}_description`}>Note</Label>
                <Textarea
                  id={`${id}_description`}
                  value={value}
                  onInput={debounce(handleSubmit(onSubmit), 1000)}
                  onChange={onChange}
                  onBlur={handleSubmit(onSubmit)}
                  theme="neutral"
                />
              </div>)}
            />
            <div className="justify-self-end">
              <Button type="secondary" onClick={() => removeNote(id)}>Supprimer la note</Button>
            </div>
        </div>),
      }}
      </Accordion>
    </form>
  )
}