import { createEffect } from "solid-js";

const Video = (props) => {

  let userVideo;

  createEffect(() => {
    props.call.on('stream', stream => {
      userVideo.srcObject = stream;

    }, err => {
      console.error(err);
    })
  })

  return (
    <div class='bg-secondary glassmorphism-card rounded-lg text-text flex items-center overflow-hidden'>
      <span class='z-20 absolute font-medium top-2 left-2'>Hello</span>
      <video autoPlay muted ref={userVideo} class='absolute w-full h-full object-cover rounded-lg'></video>
    </div>
  )
};

export default Video