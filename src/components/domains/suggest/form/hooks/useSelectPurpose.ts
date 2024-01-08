import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';
import ERROR_MESSAGE from '../constants/errorMessage';

export default function useSelectPurpose() {
  const [purpose, setPurpose] = useRecoilState<SuggestForm['purpose']>(SuggestFormSelector('purpose'));

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const setInvestAmount = useSetRecoilState<SuggestForm['investAmount']>(SuggestFormSelector('investAmount'));
  const setMoveInDate = useSetRecoilState<SuggestForm['moveInDate']>(SuggestFormSelector('moveInDate'));
  const setMoveInDateType = useSetRecoilState<SuggestForm['moveInDateType']>(SuggestFormSelector('moveInDateType'));
  const setErrorMessageInvestAmountPrice = useSetRecoilState<SuggestForm['errorMessageInvestAmountPrice']>(
    SuggestFormSelector('errorMessageInvestAmountPrice'),
  );

  const isRenderPurposeField = useMemo(() => isEqualValue(buyOrRent, BuyOrRent.Buy), [buyOrRent]);

  const handleClickBuyPurpose = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
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
          if (isEqualValue(value, '투자')) {
            if (forms.length > 3) {
              setErrorMessageInvestAmountPrice(ERROR_MESSAGE.REQUIRE_INVEST_AMOUNT);
            }
          } else {
            setErrorMessageInvestAmountPrice('');
          }
        }
      }
    },
    [
      purpose,
      setPurpose,
      setInvestAmount,
      setMoveInDate,
      setMoveInDateType,
      forms.length,
      setErrorMessageInvestAmountPrice,
    ],
  );

  return { isRenderPurposeField, purpose, handleClickBuyPurpose };
}
