import { createSignal } from "solid-js";

const [audible, setAudible] = createSignal(true);
const [visible, setVisible] = createSignal(true);
const [mystream, setMystream] = createSignal(null);

export {
  audible,
  setAudible,
  visible,
  setVisible,
  mystream,
  setMystream
}