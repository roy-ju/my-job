import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import SuggestForm from '../types';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import isEqualValue from '../../utils/isEqualValue';

export default function useChangeNegotiable() {
  const [negotiable, setNegotiable] = useRecoilState<SuggestForm['negotiable']>(SuggestFormSelector('negotiable'));

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));
  const quickSale = useRecoilValue<SuggestForm['quickSale']>(SuggestFormSelector('quickSale'));

  const handleChangeNegotiable = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const { checked } = e.target;
        setNegotiable(checked);
      }
    },
    [setNegotiable],
  );

  const isRenderNegotiableField = useMemo(() => !(!buyOrRent || isEqualValue(quickSale, '1')), [buyOrRent, quickSale]);

  return { isRenderNegotiableField, negotiable, handleChangeNegotiable };
}
