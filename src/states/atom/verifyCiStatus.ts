import { atom } from 'recoil';

import { v1 } from 'uuid';

type VerifyCiStatusAtom = {
  status: '' | 'success';
};

const verifyCiStatusAtom = atom<VerifyCiStatusAtom>({
  key: `verify_ci_popup_atom/${v1()}`,
  default: { status: '' },

  dangerouslyAllowMutability: true,
});

export default verifyCiStatusAtom;
