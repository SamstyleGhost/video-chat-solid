import { createSignal } from "solid-js";

const [muted, setMuted] = createSignal(true);
const [visible, setVisible] = createSignal(true);

export {
  muted,
  setMuted,
  visible,
  setVisible
}