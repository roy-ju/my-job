import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

type ChatButtonStore = {
  isShowMap: boolean;
  naverMapURL: string;
  naverMapURLAnother: string;
  lat?: number;
  lng?: number;
  buildingName: string;
  address: string;
};

export const chatButtonStore = atom<ChatButtonStore>({
  key: `chat_map_button/${v1()}`,
  default: {
    isShowMap: false,
    naverMapURL: '',
    naverMapURLAnother:"",
    lat: undefined,
    lng: undefined,
    buildingName:"",
    address:"",
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

  const makeURLAnother = (val?: string) => {
    setState((prev) => ({ ...prev, naverMapURLAnother: val || '' }));
  };

   const makeAddressAPI = (val?: string) => {
    setState((prev) => ({ ...prev, address: val || '' }));
  };

  const makeBuildingName = (val?: string) => {
    setState((prev) => ({ ...prev, buildingName: val || '' }));
  };


  return {
    isShowMap: state.isShowMap,
    lat: state.lat,
    lng: state.lng,
    naverMapURL: state.naverMapURL,
    naverMapAnother:state.naverMapURLAnother,
    aName:state.address,
    bName:state.buildingName,
    makeURL,
    makeURLAnother,
    makeShowMap,
    makeShowChat,
    makeShowLatLng,
    makeAddressAPI,
    makeBuildingName,
  };
}
