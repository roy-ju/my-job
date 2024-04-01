import { atom } from 'recoil';

import { v1 } from 'uuid';

type AuthPopupAtom = {
  open: boolean;
  type?: 'needVerify' | 'onlyLogin' | 'login' | '';
};

const authPopupAtom = atom<AuthPopupAtom>({
  key: `auth_popup_atom/${v1()}`,
  default: {
    open: false,
    type: '',
  },
  dangerouslyAllowMutability: true,
});

export default authPopupAtom;
