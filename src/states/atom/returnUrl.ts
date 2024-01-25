import { atom } from 'recoil';

import { v1 } from 'uuid';

type ReturnUrlAtom = {
  returnUrl?: string;
};

const returnUrlAtom = atom<ReturnUrlAtom>({
  key: `returnUrlAtom/${v1()}`,
  default: {
    returnUrl: '',
  },
  dangerouslyAllowMutability: true,
});

export default returnUrlAtom;
