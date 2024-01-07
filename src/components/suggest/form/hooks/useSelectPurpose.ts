import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

export default function useSelectPurpose() {
  const [purpose, setPurpose] = useRecoilState<SuggestForm['purpose']>(SuggestFormSelector('purpose'));

  console.log(purpose);

  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const setInvestAmount = useSetRecoilState<SuggestForm['investAmount']>(SuggestFormSelector('investAmount'));
  const setMoveInDate = useSetRecoilState<SuggestForm['moveInDate']>(SuggestFormSelector('moveInDate'));
  const setMoveInDateType = useSetRecoilState<SuggestForm['moveInDateType']>(SuggestFormSelector('moveInDateType'));

  const isRenderPurposeField = useMemo(() => buyOrRent === BuyOrRent.Buy, []);

  const handleClickBuyPurpose = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      console.log('hello');
      if (e) {
        const { value } = e.currentTarget;

        if (isEqualValue(Number(value), purpose)) {
          return;
        }

        if (isEqualValue(value, '실거주') || isEqualValue(value, '투자')) {
          setPurpose(value as '실거주' | '투자');
          setInvestAmount('');
          setMoveInDate(null);
          setMoveInDateType('');
        }
      }
    },
    [purpose, setInvestAmount, setMoveInDate, setMoveInDateType, setPurpose],
  );

  return { isRenderPurposeField, purpose, handleClickBuyPurpose };
}
