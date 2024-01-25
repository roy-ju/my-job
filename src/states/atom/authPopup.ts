import { atom } from 'recoil';

import { v1 } from 'uuid';

type AuthPopupAtom = {
  open: boolean;
  type?: 'needVerify' | 'onlyLogin' | '';
};

const authPopupAtom = atom<AuthPopupAtom>({
  key: `authPopupAtom/${v1()}`,
  default: {
    open: false,
    type: '',
  },
  dangerouslyAllowMutability: true,
});

export default authPopupAtom;
