import { createSignal } from "solid-js";
import { setSidebar } from "../signals";

const Sidebar = () => {

  const [message, setMessage] = createSignal('');

  const handleSidebar = () => {
    setSidebar(false);
  }

  const sendMessage = () => {
    console.log(message());
  }

  return (
    <div class='h-[90vh] md:h-[91vh] w-full md:w-1/4 fixed z-10 top-4 right-0 animate-slide-in glassmorphism-sidebar rounded-l-lg max-md:rounded-r-lg p-4 flex flex-col justify-start'>
      <div class='relative flex justify-end items-center h-10'>
        <button class='flex items-center' onClick={() => handleSidebar()}><ion-icon name="close" size='large'></ion-icon></button>
      </div>
      <div class='flex flex-col gap-4 chatbox-height overflow-y-auto'>
        <div class='flex flex-col gap-1'>
          <h4 class='font-semibold'>Sender</h4>
          <h5 class='text-sm'>Message</h5>
        </div>
      </div>
      <div class='flex justify-between w-full gap-4'>
        <div class='w-full'>
          <input 
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            class='bg-transparent border border-text md:rounded-[10px] rounded-[5px] md:h-[40px] h-[20px] p-4 w-full'
          />
        </div>
        <button class='flex items-center' onClick={() => sendMessage()}>
          <ion-icon name="send" size='large'></ion-icon>
        </button>
      </div>
    </div>
  )
};

export default Sidebar