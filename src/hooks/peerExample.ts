// REQUIRES SIGNALING MECHANISM
// Examples: Session Initiation Protocol over Websockets, XMPP/Jabber Message, Socket.io

//We'll be using socket.io as our signalling method

//BROWSER A
//...

const peerConnection = new RTCPeerConnection();

navigator
  .mediaDevices
  .getUserMedia({video: true, audio: true})
  .then((stream) => {
    stream.getTracks()
      .forEach((track) => peerConnection.addTrack(track));

    // SDP - Session Description Protocol
    // Contains everything peer needs to connect
    peerConnection.createOffer()
    .then((sdp) => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit('offer', peerConnection.localDescription)
    })
  });

socket.on('answer', (message: RTCSessionDescriptionInit) => {
  peerConnection.setRemoteDescription(message)
});


//BROWSER B
const peerConnection = new RTCPeerConnection()

socket.on('offer', (message: RTCSessionDescriptionInit) => {
  peerConnection.setRemoteDescription(message)
  .then(() => peerConnection.createAnswer())
  .then((sdp) => peerConnection.setLocalDescription(sdp))
  .then(() => {
    socket.emit('answer', peerConnection.localDescription)
  })
});

const video = document.createElement('video');
peerConnection.ontrack = (e) => {
 video.srcObject = new MediaStream([e.track]);
}

export default peerConnection;