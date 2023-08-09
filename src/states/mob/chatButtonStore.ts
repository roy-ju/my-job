import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

type ChatButtonStore = {
  isShowMap: boolean;
  naverMapURL: string;
  lat?: number;
  lng?: number;
};

export const chatButtonStore = atom<ChatButtonStore>({
  key: `chat_map_button/${v1()}`,
  default: {
    isShowMap: false,
    naverMapURL: '',
    lat: undefined,
    lng: undefined,
  },
  dangerouslyAllowMutability: true,
});

export function useChatButtonStore() {
  const [state, setState] = useRecoilState(chatButtonStore);

  const makeShowMap = () => {
    setState((prev) => ({ ...prev, isShowMap: true }));
  };

  const makeShowChat = () => {
    setState((prev) => ({ ...prev, isShowMap: false }));
  };

  const makeShowLatLng = (lat?: number, lng?: number) => {
    setState((prev) => ({ ...prev, lat, lng }));
  };

  const makeURL = (val?: string) => {
    setState((prev) => ({ ...prev, naverMapURL: val || '' }));
  };

  return {
    isShowMap: state.isShowMap,
    lat: state.lat,
    lng: state.lng,
    naverMapURL: state.naverMapURL,
    makeURL,
    makeShowMap,
    makeShowChat,
    makeShowLatLng,
  };
}
