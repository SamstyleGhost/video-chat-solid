import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { Controls, Video, Sidebar } from "../components";
import { useParams, useLocation } from "@solidjs/router";
import { useSocketContext } from "../context";
import { mystream, setMystream, sidebar } from '../signals';

const Meetpage = () => {

  const location = useLocation();

  const { socket, peer } = useSocketContext();

  let myVideo;

  const [calls, setCalls] = createSignal([]);

  createEffect(() => {

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myVideo.srcObject = stream;
      setMystream(stream);

      peer().on('call', (call) => {
        call.answer(stream);
        setCalls((prev) => [...prev, call]);
      })

      socket().emit('user-ready');

      socket().on('new-user-joined', (username, peerID) => {
        const call = peer().call(peerID, stream).on('error', (err) => console.log(err));
        setCalls((prev) => [...prev, call]);
      })
      
    })

    socket().on('user-disconnected', (username, peerID) => {
      console.log("User disconnected", username, peerID);
      setCalls(calls().filter(call => call.peer !== peerID));
    })

    onCleanup(() => {
      setCalls([]);
      mystream().getTracks().forEach(track => {
        track.stop();
      });
    })

  })

  return (
    // This is for the full screen, which is displayed as flex-column as Controls are always on the bottom
    <div class='h-full w-full pt-4 px-4 text-text flex flex-col'> 

      {/* This div is for the page excluding the controls. It is displayed as flex-row on large screens (which would result in sidebar showing up on the right) and flex-col on small screens (which would result in sidebar showing up on the bottom) */}
      <div class='h-full w-full flex flex-row'>
        <div class='w-full video-grid'>
          <div class='bg-secondary glassmorphism-card rounded-lg text-text flex items-center overflow-hidden'>
            <span class='z-20 absolute font-medium top-2 left-2 text-text'>{location.state}</span>
            <video autoPlay muted ref={myVideo} class='absolute w-full h-full object-cover rounded-lg'></video>
          </div>  

          <For each={calls()}>
            {(call) => (
              <Video call={call} />
            )}
          </For>

        </div>
        <Show when={sidebar()}>
          <Sidebar />
        </Show>
      </div>
        
      <Controls />

    </div>
  )
};

export default Meetpage