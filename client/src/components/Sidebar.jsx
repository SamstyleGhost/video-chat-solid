import { For, createSignal } from "solid-js";
import { useSocketContext } from "../context";
import { useParams } from "@solidjs/router";

import { setSidebar, chats, setChats } from "../signals";
import Message from "./Message";

import copy from 'clipboard-copy';


const Sidebar = () => {

  const { socket, peerID } = useSocketContext();

  const params = useParams();

  const [message, setMessage] = createSignal('');

  const handleSidebar = () => {
    setSidebar(false);
  }

  const handleMeetLinkCopy = () => {
    copy(params.room);
  }

  const sendMessage = () => {
    socket().emit('user-chat-message', params.room, peerID(), message());

    setChats(prev => [...prev, { sender: 'You', chat: message() }]);

    setMessage('');
  }

  return (
    <div class='h-[90vh] md:h-[91vh] w-full md:w-1/3 fixed z-10 top-4 right-0 animate-slide-in glassmorphism-sidebar rounded-l-lg max-md:rounded-r-lg p-4 flex flex-col justify-start'>
      <div class='relative flex justify-between items-center h-10'>
        <button onClick={() => handleMeetLinkCopy()} class="truncate w-3/4 hover:underline underline-offset-2 flex justify-start items-center">
          {params.room}
        </button>
        <button class='flex items-center' onClick={() => handleSidebar()}><ion-icon name="close" size='large'></ion-icon></button>
      </div>
      <div class='flex flex-col gap-4 chatbox-height overflow-y-auto pt-4'>
        <For each={chats()}>
          {(chat) => {
            return <Message sender={chat.sender} chat ={chat.chat} />
          }}
        </For>
      </div>
      <div class='flex justify-between w-full gap-4 mt-4'>
        <div class='w-full'>
          <input 
            type="text"
            value={message()}
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