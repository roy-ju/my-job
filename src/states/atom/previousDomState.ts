import { atom } from 'recoil';

const previousDomState = atom<string[]>({
  key: 'previousDomState',
  default: [],
});

export default previousDomState;
