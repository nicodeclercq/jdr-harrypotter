import React, { useEffect } from 'react';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
import { usePersistantState } from '../../hooks/usePersistantState';
import { useSocket } from '../../hooks/useSocket';

export function Video(){
  const { connectedUsers } = useConnectedUsers();
  const { emit, on } = useSocket();
  const [peers, setPeers] = usePersistantState('PEERS', {} as Record<string, RTCPeerConnection>);

  useEffect(() => {
    Object.entries(connectedUsers)
      .filter(([user]) => !(user in peers))
      .forEach(([user]) => {
        const peerConnection = new RTCPeerConnection();
        setPeers({
          ...peers,
          [user]: peerConnection,
        });

        navigator
          .mediaDevices
          .getUserMedia({video: true, audio: true})
          .then((stream) => {
            stream.getTracks()
              .forEach((track) => peerConnection.addTrack(track));

            peerConnection.createOffer()
              .then((sdp) => peerConnection.setLocalDescription(sdp))
              .then(() => {
                emit({type: 'peer_offer', message: peerConnection.localDescription});
              });
          });
      });
  }, [connectedUsers, emit, peers, setPeers]);

  useEffect(() => {
    const unsubscribe = on('peer_answer', (author, message: RTCSessionDescriptionInit) => {
      const peerConnection = peers[author.name];
      peerConnection.setRemoteDescription(message)
    });

    return unsubscribe;
  })
  
  return <video />;
}