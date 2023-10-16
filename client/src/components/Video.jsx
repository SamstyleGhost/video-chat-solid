import { createEffect, createSignal } from "solid-js";
import { useSocketContext } from "../context";

const Video = (props) => {

  const { socket } = useSocketContext();

  let userVideo;
  let username;  

  createEffect(() => {
    props.call.on('stream', stream => {
      userVideo.srcObject = stream;

      socket().emit('request-member', props.roomID, props.call.peer);
      socket().on('requested-username', name => {
        username.innerHTML = name;
      })
    }, err => {
      console.error(err);
    })
  })

  return (
    <div class='w-full bg-secondary glassmorphism-card rounded-lg text-black'>
      <span class='z-20 text-black absolute' ref={username}></span>
      <video autoPlay muted ref={userVideo} class='w-full h-full object-cover'></video>
    </div>
  )
};

export default Video