import { createSignal } from "solid-js";

const [audible, setAudible] = createSignal(true);
const [visible, setVisible] = createSignal(true);
const [mystream, setMystream] = createSignal(null);
const [sidebar, setSidebar] = createSignal(false);

export {
  audible,
  setAudible,
  visible,
  setVisible,
  mystream,
  setMystream,
  sidebar,
  setSidebar
}