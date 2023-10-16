import { Show } from "solid-js";
import { muted, setMuted, visible, setVisible } from "../signals";

const Controls = () => {

  const handleAudioChange = () => {
    setMuted(!muted());
  };

  const handleVideoChange = () => {
    setVisible(!visible());
  };

  const handleExit = () => {
    console.log("User wants to exit");
  }

  return (
    <div class='text-center w-full h-16 flex justify-center items-center'>
      <div class='w-1/3 flex justify-around items-center glassmorphism-card rounded-xl py-1'>
        <button onClick={() => handleAudioChange()} class='flex items-center'>
          <Show when={muted()} fallback={<ion-icon name="mic-outline" size='large'></ion-icon>}>
            <ion-icon name="mic" size='large'></ion-icon>
          </Show>
        </button>
        <button onClick={() => handleVideoChange()} class='flex items-center'>
          <Show when={visible()} fallback={<ion-icon name="videocam-outline" size='large'></ion-icon>}>
            <ion-icon name="videocam" size='large'></ion-icon>
          </Show>
        </button>
        <button onClick={() => handleExit()} class='flex items-center'><ion-icon name="exit" size='large'></ion-icon></button>
      </div>
    </div>
  )
};

export default Controls