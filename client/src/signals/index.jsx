import { createSignal } from "solid-js";

const [audible, setAudible] = createSignal(true);
const [visible, setVisible] = createSignal(true);
const [mystream, setMystream] = createSignal(null);
const [sidebar, setSidebar] = createSignal(false);
const [users, setUsers] = createSignal([]);
const [chats, setChats] = createSignal([]);

export {
  audible,
  setAudible,
  visible,
  setVisible,
  mystream,
  setMystream,
  sidebar,
  setSidebar,
  users,
  setUsers,
  chats,
  setChats
}