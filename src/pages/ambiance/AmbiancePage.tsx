import React, { useState } from 'react';
import { pipe } from 'fp-ts/function';
import { Card } from '../../components/Card';
import { Form } from '../../components/Form';
import { Layout } from '../../components/Layout';
import { fromReloadable } from '../../helpers/Reloadable';
import { useMusic } from '../../hooks/useMusic';
import { usePersistantState } from '../../hooks/usePersistantState';
import { FigmaFrames } from './FigmaFrames';
import { Button } from '../../components/Button';
import { Icon } from '../../components/icons/Icon';
import { MusicModal } from './MusicModal';
import { isDefined } from '../../helpers/nullable';
import { ButtonIcon } from '../../components/ButtonIcon';

type Music = {name: string, url: string};

export function AmbiancePage() {
  const [showMusicModal, setShowMusicModal] = useState<Music>();
  const [file, setFile] = usePersistantState<string | undefined>('AMBIANCE_LINK', undefined);
  const {data, add, remove, update, stop, play, playingMusic} = useMusic();

  const onSubmit = ({file}: {file: string}) => {
    setFile(file);
  }

  const onSubmitMusic = ({name, url}: {name: string, url: string}) => {
    if(isDefined(showMusicModal) && showMusicModal.name !== ''){
      if(showMusicModal.name === name){
        update(name, {name, url});
      } else {
        add(name, {name, url});
        remove(showMusicModal.name);    
      }
    }else{
      add(name, {name, url});
    }
    setShowMusicModal(undefined);
  };

  const onClickOnMusic = (name: string, url: string) => () => {
    if(playingMusic === name){
      stop();
    } else{
      play(name, url);
    }
  }

  return <Layout>
    <div className="w-full gap-2" style={{
      display: 'grid',
      gridTemplateColumns: '1fr max-content',
    }}>
      <Card fullWidth title="Images" grow>
        <div className="flex flex-col p-2 overflow-scroll space-x-2" style={{height: '66vh'}}>
          <Form onSubmit={onSubmit} fields={{file: { defaultValue: file ?? '', label: 'Lien figma' }}} submitOnBlur />
          <FigmaFrames file={file ?? ''}/>
        </div>
      </Card>
      <Card
        fullWidth
        title={(
          <div className="flex items-center space-x-2">
            <span className="flex-grow">Musique</span>
            <Button type='secondary' onClick={() => setShowMusicModal({name: '', url: ''})}>
              <Icon name="INCREASE" />
            </Button>
          </div>
        )}
      >
        <div className="overflow-scroll divide-y" style={{height: '66vh'}}>
          {
            pipe(
              data,
              fromReloadable(
                (data) => <>{
                  data.map(({ name, url }) => (
                    <div key={name} className="flex flex-row items-center w-full p-2 space-x-2">
                      <ButtonIcon icon="PEN"  onClick={() => setShowMusicModal({name, url})} />
                      <div className='flex-grow'>{name}</div>
                      <Button type='secondary' onClick={onClickOnMusic(name, url)}>
                        {playingMusic === name ? '◼︎' : '▶︎'}
                      </Button>
                    </div>
                  ))
                }</>,
                (error) => (
                  <div>Oups {error.message}</div>
                )
              )
            )
          }
        </div>
      </Card>
    </div>
    {
      showMusicModal && (
        <MusicModal
          value={showMusicModal}
          onCancel={() => setShowMusicModal(undefined)}
          onSubmit={onSubmitMusic}
        />
      )
    }
  </Layout>;
}