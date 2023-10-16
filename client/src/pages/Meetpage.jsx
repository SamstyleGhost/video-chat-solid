import { For, createEffect, createSignal } from "solid-js";
import { Controls, Video, Sidebar } from "../components";
import { useParams, useLocation } from "@solidjs/router";
import { useSocketContext } from "../context";
import { setMystream, visible } from '../signals';

const Meetpage = () => {

  const params = useParams();
  console.log(params.room);

  const location = useLocation();

  const { socket, peer } = useSocketContext();

  let myVideo;

  const [calls, setCalls] = createSignal([]);
  const [sidebar, setSidebar] = createSignal(false);

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
        console.log("New user joined", username, peerID);
        const call = peer().call(peerID, stream).on('error', (err) => console.log(err));
        setCalls((prev) => [...prev, call]);
      })
      
    })

    socket().on('user-disconnected', (username, peerID) => {
      console.log("User disconnected", username, peerID);
      setCalls(calls().filter(call => call.peer !== peerID));
    })

  })

  return (
    // This is for the full screen, which is displayed as flex-column as Controls are always on the bottom
    <div class='h-screen w-full pt-4 px-4 text-text flex flex-col'> 

      {/* This div is for the page excluding the controls. It is displayed as flex-row on large screens (which would result in sidebar showing up on the right) and flex-col on small screens (which would result in sidebar showing up on the bottom) */}
      <div class='h-full w-full flex flex-row'>
        <div class='h-full w-full video-grid relative'>
          <div class='w-full bg-secondary glassmorphism-card rounded-lg text-black overflow-hidden'>
            <span class='z-20 absolute font-medium top-2 left-2' classList={{'bg-primary px-2 py-1 rounded-md text-black': visible(), 'text-text': !visible()}}>{location.state}</span>
            <video autoPlay ref={myVideo} class='w-full h-full object-cover'></video>
          </div>  

          <For each={calls()}>
            {(call) => (
              <Video call={call} roomID={params.room}/>
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