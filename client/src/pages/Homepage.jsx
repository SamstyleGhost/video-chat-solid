import { Button, Navbar } from "../components";
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useSocketContext } from "../context";

const Homepage = () => {

  const { peerID, socket } = useSocketContext();

  const [username, setUserName] = createSignal('');
  const [meetID, setMeetID] = createSignal('');

  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if(meetID()){
      socket().emit('join-room', meetID(), peerID(), username());
      navigate(`/meet/${meetID()}`, { state: username() });
    } else {
      alert('Please enter meeting link to join');
    }
  }

  const handleCreateRoom = () => {
    socket().emit('create-room');
    socket().on('room-created', roomID => {
      socket().emit('join-room', roomID, peerID(), username());
      navigate(`/meet/${roomID}`, { state: username() });
    })
  }

  return (
    <>
    <Navbar />
    <div class='w-full h-full flex justify-center items-center text-text'>
      <div>
        <div class='flex flex-col items-center md:gap-7 gap-5 md:w-[400px] w-[300px] glassmorphism-card shadow-sm shadow-text drop-shadow-sm py-10 px-8 md:rounded-[20px] rounded-[10px]'>
          <div class='w-full flex flex-col gap-2'>
            <label class='font-light md:text-2xl text-lg'>Username:</label>
            <input 
            class='bg-transparent border border-text md:rounded-[10px] rounded-[5px] md:h-[40px] h-[20px] p-4' 
            type="text"
            required
            onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div class='w-full flex flex-col gap-2'>
            <label class='font-light md:text-2xl text-lg'>Room:</label>
            <input 
            class='bg-transparent border border-text md:rounded-[10px] rounded-[5px] md:h-[40px] h-[20px] p-4' 
            type="text"
            onChange={(e) => setMeetID(e.target.value)}
            />
          </div>
          <Button 
            type='button'
            width='w-2/3'
            styles='bg-primary mt-4'
            onClick={() => handleJoinRoom()}
            text='Join room'
          />
          <div class='flex flex-col items-center md:gap-3 gap-2 w-2/3'>
            <span class='md:text-xs text-[8px] underline italic'>Want to create a new room, click here:</span>
            <Button 
              type='button'
              width='w-full'
              styles='bg-secondary'
              onClick={() => handleCreateRoom()}
              text='Create room'
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default Homepage