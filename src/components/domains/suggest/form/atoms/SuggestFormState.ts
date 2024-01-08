import { atom } from 'recoil';

import { v1 } from 'uuid';

import initialValue from '../constants/initialValue';

import SuggestForm from '../types';

const SuggestFormState = atom<SuggestForm>({
  key: `SuggestFormState/${v1()}`,

  default: initialValue as SuggestForm,

  dangerouslyAllowMutability: true,
});

export default SuggestFormState;
