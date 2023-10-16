import { For, createEffect, createSignal } from "solid-js";
import { Controls, Video } from "../components";
import { useParams, useLocation } from "@solidjs/router";
import { useSocketContext } from "../context";

const Meetpage = () => {

  const params = useParams();
  console.log(params.room);

  const location = useLocation();
  console.log(location.state);

  const { socket, peer } = useSocketContext();

  let myVideo;

  const [calls, setCalls] = createSignal([]);
  const [mystream, setMystream] = createSignal(null);


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

  })

  return (
    <div class='w-full h-full flex flex-col'>
      <div class='w-full h-full flex justify-center items-center md:px-10 px-5 py-2'>
        <div class='w-full h-full video-grid overflow-hidden'>

          <div class='w-full rounded-lg text-black relative'>
            <span class='z-20 text-black absolute'>{location.state}</span>
            <video autoPlay ref={myVideo} class='w-full h-full'></video>
          </div>

          <For each={calls()}>
            {(call) => (
              <Video call={call} roomID={params.room}/>
            )}
          </For>

        </div>
      </div>
      <Controls stream={mystream} />
    </div>
  )
};

export default Meetpage