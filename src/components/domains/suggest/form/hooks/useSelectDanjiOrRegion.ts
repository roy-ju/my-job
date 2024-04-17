import { useCallback } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { DanjiOrRegionalType } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEnumValue from '../../utils/isEnumValue';

import isEqualValue from '../../utils/isEqualValue';

export default function useSelectDanjiOrRegion() {
  const [danjiOrRegion, setDanjiOrRegion] = useRecoilState<SuggestForm['danjiOrRegion']>(
    SuggestFormSelector('danjiOrRegion'),
  );

  const address = useRecoilValue<SuggestForm['address']>(SuggestFormSelector('address'));
  const danjiName = useRecoilValue<SuggestForm['danjiName']>(SuggestFormSelector('danjiName'));

  const setPopup = useSetRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const handleUpdatePopup = useCallback(
    (value: SuggestForm['popup']) => {
      setPopup(value);
    },
    [setPopup],
  );

  /** STEP 단지 및 지역선택 */
  const handleClickDanjiOrRegion = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEnumValue(Number(value), DanjiOrRegionalType)) {
          setDanjiOrRegion(Number(value));
          handleUpdatePopup(isEqualValue(Number(value), DanjiOrRegionalType.Regional) ? 'regionList' : 'danjiList');
        }
      }
    },
    [handleUpdatePopup, setDanjiOrRegion],
  );
  /** STEP 단지 및 지역선택 */
  const handleOpenReselectPopup = useCallback(() => {
    if (danjiName) {
      handleUpdatePopup('reselectDanji');
    } else {
      handleUpdatePopup('reselectRegion');
    }
  }, [danjiName, handleUpdatePopup]);

  return { danjiOrRegion, address, danjiName, handleClickDanjiOrRegion, handleOpenReselectPopup };
}
