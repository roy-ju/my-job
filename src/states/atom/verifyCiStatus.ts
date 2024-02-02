import { atom } from 'recoil';

import { v1 } from 'uuid';

type VerifyCiStatusAtom = {
  status: '' | 'success';
};

const verifyCiStatusAtom = atom<VerifyCiStatusAtom>({
  key: `verifyCiPopupAtom/${v1()}`,
  default: { status: '' },

  dangerouslyAllowMutability: true,
});

export default verifyCiStatusAtom;
