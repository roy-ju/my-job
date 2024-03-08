import { atom } from 'recoil';

import { v1 } from 'uuid';

type InAppInfoAtom = {
  popupOpen: boolean;
  isInAppBrowser: boolean;
};

const inAppInfoAtom = atom<InAppInfoAtom>({
  key: `in_app_info_atom/${v1()}`,
  default: {
    popupOpen: false,
    isInAppBrowser: false,
  },
  dangerouslyAllowMutability: true,
});

export default inAppInfoAtom;
