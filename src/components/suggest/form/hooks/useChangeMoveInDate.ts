import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import getIncludeValue from '../../utils/getIncludeValue';

import isEqualValue from '../../utils/isEqualValue';

export default function useChangeMoveInDate() {
  const [moveInDate, setMoveInDate] = useRecoilState<SuggestForm['moveInDate']>(SuggestFormSelector('moveInDate'));

  const [moveInDateType, setMoveInDateType] = useRecoilState<SuggestForm['moveInDateType']>(
    SuggestFormSelector('moveInDateType'),
  );

  const purpose = useRecoilValue<SuggestForm['purpose']>(SuggestFormSelector('purpose'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const handleChangeMoveInDate = useCallback(
    (value: Date | null) => {
      if (isEqualValue(value, moveInDate)) {
        return;
      }

      if (value) {
        setMoveInDate(value);
      }
    },
    [moveInDate, setMoveInDate],
  );

  const handlChangeMoveInDateType = useCallback(
    (value: string) => {
      if (isEqualValue(value, moveInDateType)) {
        return;
      }

      if (getIncludeValue(value, ['이전', '이후', '당일'])) {
        setMoveInDateType(value as '이전' | '이후' | '당일');
      }
    },
    [moveInDateType, setMoveInDateType],
  );

  const isRenderMoveInDateField = useMemo(
    () => buyOrRent === BuyOrRent.Jeonsae || purpose === '실거주',
    [buyOrRent, purpose],
  );

  return { isRenderMoveInDateField, moveInDate, moveInDateType, handleChangeMoveInDate, handlChangeMoveInDateType };
}
