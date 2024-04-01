import { atom } from 'recoil';

import { v1 } from 'uuid';

type VerifyCiPopupAtom = {
  open: boolean;
  title?: string;
  subTitle?: string;
  cancelButtonTitle?: string;
  cancelButtonEvent?: () => void;
  actionButtonTitle?: string;
  actionButtonEvent?: () => void;
};

const verifyCiPopupAtom = atom<VerifyCiPopupAtom>({
  key: `verify_ci_popup_atom/${v1()}`,
  default: {
    open: false,
  },
  dangerouslyAllowMutability: true,
});

export default verifyCiPopupAtom;
