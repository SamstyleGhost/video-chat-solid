import { createContext, useContext, createMemo, createSignal } from 'solid-js';
import { io } from 'socket.io-client';
import { Peer } from 'peerjs'

export const SocketContext = createContext();

export const SocketContextProvider = (props) => {
  const socket = createMemo(() => io('http://localhost:5000'));
  const peer = createMemo(() => new Peer());


  // let socket, peer;

  const [peerID, setPeerID] = createSignal('');

  peer().on('open', id => {
    setPeerID(id);
  })

  return(
    <SocketContext.Provider value={{socket, peer, peerID}}>
      {props.children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  return useContext(SocketContext);
}
