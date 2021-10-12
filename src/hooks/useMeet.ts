import { useEffect } from 'react';
import { usePersistantState } from "./usePersistantState";

const audioElement = document.createElement('audio');
const videoElement = document.createElement('video');
videoElement.id = 'camera';
videoElement.style.position = 'fixed';
videoElement.style.top = '0';
videoElement.style.right = '0';
videoElement.style.width = '20vh';
videoElement.style.borderRadius = '0.5rem';
videoElement.style.boxShadow = '0.5rem 0.5rem 1rem rgba(0,0,0,0.5)';

document.body.appendChild(videoElement);

let isInitialized = false;
function getLocalStream(hasVideo: boolean, hasMicrophone: boolean) {
  navigator.mediaDevices.getUserMedia({video: hasVideo, audio: hasMicrophone})
    .then( stream => {
      const {audio, video} = stream.getTracks()
        .reduce(
          ({audio, video}, cur) => {
            if(cur.kind === 'audio'){
              return {audio: [...audio, cur], video};
            }else {
              return {video: [...video, cur], audio};
            }
          },
          {video: [], audio: []} as {video: MediaStreamTrack[], audio: MediaStreamTrack[]}
        );          
        audioElement.srcObject =  new MediaStream(audio);
        audioElement.play();
        videoElement.srcObject =  new MediaStream(video);
        videoElement.play();
    }).catch( err => {
        console.log("u got an error:" + err)
    });
}

export const useMeet = () => {
  const [hasMicrophone] = usePersistantState('IS_MICROPHONE_ACTIVE', false);
  const [hasCamera] = usePersistantState('IS_CAMERA_ACTIVE', false);

  useEffect(() => {
    if(!isInitialized){
      isInitialized = true;
      getLocalStream(hasCamera, hasMicrophone);
    }

    if(hasMicrophone){
      audioElement.play();
    }else{
      audioElement.pause();
    }
    if(hasCamera){
      videoElement.play();
    }else{
      videoElement.pause();
    }
  }, [hasMicrophone, hasCamera]);
}