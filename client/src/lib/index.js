import { users } from '../signals';

export const getUserName = (id) => {
  const userName = users().find(user => user.peerID === id);

  return userName.username;
}