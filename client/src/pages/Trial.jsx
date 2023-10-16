import { Show, createSignal } from "solid-js";
import { Controls, Sidebar } from "../components";

const Trial = () => {

  const [sidebar, setSidebar] = createSignal(false);

  return (
    // This is for the full screen, which is displayed as flex-column as Controls are always on the bottom
    <div class='h-screen w-full pt-4 px-4 text-text flex flex-col'> 

      {/* This div is for the page excluding the controls. It is displayed as flex-row on large screens (which would result in sidebar showing up on the right) and flex-col on small screens (which would result in sidebar showing up on the bottom) */}
      <div class='h-full w-full flex flex-row'>
        <div class='h-full w-full video-grid relative'>
          <div class='bg-secondary glassmorphism-card rounded-lg text-text'>
            Video
          </div>
          <div class='bg-secondary glassmorphism-card rounded-lg text-text'>
            Video
          </div>
          <div class='bg-secondary glassmorphism-card rounded-lg text-text'>
            Video
          </div>
          <div class='bg-secondary glassmorphism-card rounded-lg text-text'>
            Video
          </div>
        </div>
        <Show when={sidebar()}>
          <Sidebar />
        </Show>
      </div>
        
      <Controls />

    </div>
  )
};

export default Trial