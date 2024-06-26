import { atom } from 'recoil';

import { v1 } from 'uuid';

interface SyncronizerAtom {
  unreadChatCount: number;
  unreadNotificationCount: number;
}

const syncronizerAtom = atom<SyncronizerAtom>({
  key: `syncronizer_atom/${v1()}`,
  default: {
    unreadChatCount: 0,
    unreadNotificationCount: 0,
  },
});

export default syncronizerAtom;
