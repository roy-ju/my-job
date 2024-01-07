import { selectorFamily } from 'recoil';

import SuggestForm from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

type Params = keyof SuggestForm;

const SuggestFormSelector = selectorFamily<any, Params>({
  key: `SuggestFormSelector`,
  get:
    (params) =>
    ({ get }) => {
      const state = get(SuggestFormState);
      return state[params];
    },
  set:
    (params) =>
    ({ get, set }, newValue) =>
      set(SuggestFormState, { ...get(SuggestFormState), [params]: newValue }),
});

export default SuggestFormSelector;
