import { createSignal } from "solid-js";

const [muted, setMuted] = createSignal(false);
const [visible, setVisible] = createSignal(false);

export {
  muted,
  setMuted,
  visible,
  setVisible
}