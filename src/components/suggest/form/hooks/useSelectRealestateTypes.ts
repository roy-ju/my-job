import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEnumValue from '../../utils/isEnumValue';

import isEqualValue from '../../utils/isEqualValue';

export default function useSelectRealestateTypes() {
  const [realestateTypes, setRealestateTypes] = useRecoilState<SuggestForm['realestateTypes']>(
    SuggestFormSelector('realestateTypes'),
  );

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));

  const handleClickRealestateType = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEnumValue(Number(value), RealestateType)) {
          const realestateType = Number(value);

          if (realestateTypes.includes(realestateType)) {
            const filteredRealestateTypes = realestateTypes.filter((ele) => ele !== realestateType);
            setRealestateTypes(filteredRealestateTypes);
          } else {
            const concatedRealestateTypes = realestateTypes.concat(realestateType);
            setRealestateTypes(concatedRealestateTypes);
          }
        }
      }
    },
    [realestateTypes, setRealestateTypes],
  );

  const isRender = useMemo(() => isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji), [danjiOrRegion]);

  return { isRenderRealestateTypeField: isRender, realestateTypes, handleClickRealestateType };
}
