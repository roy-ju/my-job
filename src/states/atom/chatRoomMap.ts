import { atom } from 'recoil';

import { v1 } from 'uuid';

type ChatRoomMapAtom = {
  isShowMap: boolean;
  naverMapURL: string;
  naverMapURLAnother: string;
  lat?: number;
  lng?: number;
  buildingName: string;
  address: string;
};

const chatRoomMapAtom = atom<ChatRoomMapAtom>({
  key: `chatRoomMapAtom/${v1()}`,
  default: {
    isShowMap: false,
    naverMapURL: '',
    naverMapURLAnother: '',
    lat: undefined,
    lng: undefined,
    buildingName: '',
    address: '',
  },
  dangerouslyAllowMutability: true,
});

export default chatRoomMapAtom;
