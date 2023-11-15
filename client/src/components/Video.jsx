import { createEffect, createSignal } from "solid-js";
import { useSocketContext } from "../context";
import { useParams } from "@solidjs/router";

import { setUsers } from '../signals';
import { getUserName } from "../lib";

const Video = (props) => {

  let userVideo;

  const { socket } = useSocketContext();

  const [callerName, setCallerName] = createSignal('');

  const params = useParams();

  createEffect(() => {
    props.call.on('stream', stream => {
      userVideo.srcObject = stream;
      socket().emit('request-members', params.room);
      socket().on('requested-members-response', userList => {
        setUsers(userList);
        setCallerName(getUserName(props.call.peer));
      })

    }, err => {
      console.error(err);
    })
  })

  return (
    <div class='bg-secondary glassmorphism-card rounded-lg text-text flex items-center overflow-hidden'>
      <span  class='z-20 absolute font-medium top-2 left-2 text-text'>{callerName()}</span>
      <video autoPlay ref={userVideo} class='absolute w-full h-full object-cover rounded-lg'></video>
    </div>
  )
};

export default Video