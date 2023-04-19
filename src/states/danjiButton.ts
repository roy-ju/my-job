import { atom, useRecoilValue } from 'recoil';
import { v1 } from 'uuid';

export const danjiButtonState = atom<{ school: boolean; around: boolean }>({
  key: `negocio_danji_map/${v1()}`,
  default: { school: false, around: false },
  dangerouslyAllowMutability: true,
});

export default function useDanjiMapButton() {
  const btnState = useRecoilValue(danjiButtonState);
  return btnState;
}
