import { Show, createSignal } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { audible, setAudible, visible, setVisible, mystream, sidebar, setSidebar } from "../signals";
import copy from 'clipboard-copy';

const Controls = () => {

  const params = useParams();

  const navigate = useNavigate();

  const [popup, setPopup] = createSignal(false);

  const handleAudioChange = () => {
    mystream().getAudioTracks()[0].enabled = !(mystream().getAudioTracks()[0].enabled);
    setAudible(mystream().getAudioTracks()[0].enabled);
  };

  const handleVideoChange = () => {
    mystream().getVideoTracks()[0].enabled = !(mystream().getVideoTracks()[0].enabled);
    setVisible(mystream().getVideoTracks()[0].enabled);
  };

  const handleSidebar = () => {
    setSidebar(prev => !prev);
  }

  const handleExit = () => {
    navigate('/');
  }

  const handleMeetLinkCopy = () => {
    copy(params.room);

    setPopup(true);
    setTimeout(() => setPopup(false), 1000);
  }

  return (
    <div class='text-center w-full h-16 flex justify-center items-center relative'>
      <button onClick={handleMeetLinkCopy} class="hidden md:block absolute left-0 top-4">
        {params.room}
      </button>
      <Show when={popup()}>
        <div class="absolute left-2 animate-popup bg-accent opacity-80 px-4 py-2 rounded-lg">
          <span class='text-text'>Meeting link copied</span>
        </div>
      </Show>

      <div class='w-[300px] flex justify-around items-center glassmorphism-card rounded-xl py-1 flex-shrink-0'>
        <button onClick={() => handleAudioChange()} class='flex items-center'>
          <Show when={audible()} fallback={<ion-icon name="mic-outline" size='large'></ion-icon>}>
            <ion-icon name="mic" size='large'></ion-icon>
          </Show>
        </button>

        <button onClick={() => handleVideoChange()} class='flex items-center'>
          <Show when={visible()} fallback={<ion-icon name="videocam-outline" size='large'></ion-icon>}>
            <ion-icon name="videocam" size='large'></ion-icon>
          </Show>
        </button>

        <button onClick={() => handleSidebar()} class="md:hidden flex items-center">
          <Show when={sidebar()} fallback={<ion-icon name="chatbox" size='large'></ion-icon>}>
            <ion-icon name="chatbox-outline" size='large'></ion-icon>
          </Show>
        </button>

        <button onClick={() => handleExit()} class='flex items-center'><ion-icon name="exit" size='large' color='red'></ion-icon></button>

      </div>
      <button onClick={() => handleSidebar()} class="hidden md:block absolute right-0 top-4">
        <Show when={sidebar()} fallback={<ion-icon name="chatbox" size='large'></ion-icon>}>
          <ion-icon name="chatbox-outline" size='large'></ion-icon>
        </Show>
      </button>
    </div>
  )
};

export default Controls