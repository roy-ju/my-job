import { atom } from 'recoil';

import { v1 } from 'uuid';

type EntryUrlAtom = {
  entryUrl?: string;
};

/** 필요 할 수도 있음 추후 entry문제 생겼을시를 위한 globalState */
const entryUrlAtom = atom<EntryUrlAtom>({
  key: `entry_url_atom/${v1()}`,
  default: {
    entryUrl: '',
  },
  dangerouslyAllowMutability: true,
});

export default entryUrlAtom;
