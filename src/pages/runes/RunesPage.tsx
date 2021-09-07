import React, { useState } from 'react';
import { pipe } from 'fp-ts/function';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { Rune, RuneName, RUNES } from '../../components/Runes';
import { keys } from '../../helpers/object';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { useRune } from './useRune';
import { Button } from '../../components/Button';
import { Icon } from '../../components/icons/Icon';
import { useTraits } from '../home/useTraits';
import { RollModal } from '../../components/RollModal';
import { useNotification } from '../../components/Notification';

function RuneForm({name, signification, addRune}: {name: RuneName; signification: string; addRune: () => void;}) {
  const { setSignification } = useRune();
  const { handleSubmit, control } = useForm<{signification: string}>({
    defaultValues: { signification },
  });

  const onSubmit = ({signification}: {signification: string}) => {
    setSignification(name, signification);
  }

  return (
    <div key={name} className="flex flex-col items-center justify-center p-2 text-white space-x-2 space-y-2">
      <button onClick={() => addRune()} className="flex items-center justify-center text-4xl border border-solid rounded filter drop-shadow-sm">
        <Rune name={name} />
      </button>
      {name}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="signification"
          control={control}
          render={({value, onChange}) => (
            <Input
              theme="neutral"
              type="text"
              onChange={onChange}
              onBlur={handleSubmit(onSubmit)}
              value={value}
              width="10ch"
            />
          )}
        />
      </form>
    </div>
  )
}

export function RunesPage(){
  const [rollModal, setRollModal] = useState<string | undefined>(undefined);
  const [usedRunes, setUsedRunes] = useState<RuneName[]>([]);
  const { traits } = useTraits();
  const { runesDefinition, knownRunes } = useRune();
  const { add } = useNotification();

  const addRune = (name: RuneName) => {
    setUsedRunes([...usedRunes, name]);
  }
  const removeRune = (index: number) => {
    setUsedRunes(usedRunes.filter((_, i) => i !== index));
  }
  const roll = (phrase: string) => setRollModal(phrase);
  const onRollEnd = (phrase: string) => () => {
    setRollModal(undefined);
    add({
      id: phrase,
      type: 'success',
      message: phrase,
    });
  }

  return pipe(
    sequence({
      runesDefinition,
      knownRunes,
      traits,
    }),
    fromRemoteData(
      ({runesDefinition, knownRunes, traits}) => (
        <Layout>
          <div className="h-full p-2 space-y-2">
            <div className="relative items-center w-full p-2 bg-gray-600 rounded grid grid-flow-col auto-cols-max gap-2" style={{minHeight: '25vh'}}>
              {
                usedRunes.map((rune, index) => (
                  <button key={`${rune}_${index}`} onClick={() => removeRune(index)} draggable className="flex flex-col items-center justify-center p-2 text-white bg-gray-400 rounded shadow-md space-x-2">
                    <span className="text-4xl filter drop-shadow-sm"><Rune name={rune} /></span>
                    {rune}
                    <span className="text-xs">{runesDefinition[rune] ?? '-'}</span>
                  </button>
                ))
              }
              <div className="absolute top-2 left-2">
                <Button onClick={() => roll(usedRunes.map(rune => `${rune} (${runesDefinition[rune]})`).join(' '))} type="secondary">
                  <Icon name="DICE" />
                </Button>
              </div>
            </div>
            <div className="overflow-y-scroll grid grid-cols-8 gap-4" style={{maxHeight: '70vh'}}>
              {
                keys(RUNES)
                  .filter(rune => knownRunes.includes(rune))
                  .map((rune) => (
                    <RuneForm key={rune} addRune={() => addRune(rune)} name={rune} signification={runesDefinition[rune] ?? ''} />
                  ))
              }
            </div>
          </div>
          {
            rollModal != null && <RollModal
              successPercentage={traits.Pouvoir * 5}
              title={`${rollModal}`}
              onRollEnd={onRollEnd(rollModal)}
            />
          }
        </Layout>
      ))
  )
}