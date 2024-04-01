import { atom } from 'recoil';

import { v1 } from 'uuid';

export interface RecentlyClickedElementIdAtom {
  id?: string;
}

const recentlyClickedElementIdAtom = atom<RecentlyClickedElementIdAtom>({
  key: `negocio_recently_clicked_element_id_atom/${v1()}`,
  default: {},
  dangerouslyAllowMutability: true,
});

export default recentlyClickedElementIdAtom;
