import { useContext } from 'react';

import { FormDispatchContext } from '../provider/SuggestRegionalProvider';

export default function useFormDispatch() {
  return useContext(FormDispatchContext);
}
