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
import { Info } from '../../components/Info';

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
      <button onClick={() => addRune()} className="flex items-center justify-center text-4xl bg-gray-700 border border-solid rounded filter drop-shadow-sm">
        <Rune name={name} />
      </button>
      <div style={{textShadow: '0 2px 1px rgba(0,0,0,0.5)'}}>{name}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="signification"
          control={control}
          render={({value, onChange}) => (
            <div className="bg-gray-400 rounded">
            <Input
              theme="neutral"
              type="text"
              onChange={onChange}
              onBlur={handleSubmit(onSubmit)}
              value={value}
              width="10ch"
            />
            </div>
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
            <Info icon="RUNE">
              La magie des runes est un art complexe. Aucun livre ne peut ??tre ??crit sur les runes car il serait alors dot?? de pouvoir magiques incontrolables.
              Pour cela cette magie ne se transmet que de bouche ?? oreille en utilisant des supports qui sont d??truits au fur et ?? mesure.
              <br />
              Un sorcier qui apprend cette magie doit donc d'abord d??couvrir la signification de la rune qu'il souhaite utiliser avant de pouvoir l'utiliser convenablement.
              <br />
              Plus la rune sera grav??e durablement plus sont effet sera puissant. L'inscription des runes se fait avec un couteau sp??cial nomm?? "Kriss".
              Le sorcier perdant son Kriss ne pourra plus ??crire de runes.
              ??crire des runes sans utiliser le Kriss mettrais en danger l'auteur car celles-ci deviendraient incontrolables.
              <br />
              Le Kriss a une telle importance pour le runiste que celui-ci ne penserais m??me pas l'utiliser pour autre chose que ce pour quoi il est fait,
              m??me s'il ferait une arme redoutable.
            </Info>
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
            <div className="overflow-y-scroll grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4" style={{maxHeight: '70vh'}}>
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