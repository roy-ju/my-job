import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import SuggestForm from '../types';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import isEqualValue from '../../utils/isEqualValue';

import {
  DanjiBuyInvestOptions,
  DanjiBuyMoveInDateOptions,
  DanjiJeonsaeOptions,
  RegionBuyApartInvestOptions,
  RegionBuyNotApartInvestOptions,
  RegionJeonsaeApartOptions,
  RegionJeonsaeNotApartOptions,
  RegionBuyApartMoveInDateOptions,
  RegionBuyNotApartMoveInDateOptions,
} from '../constants/hashtags';
import getIncludeValue from '../../utils/getIncludeValue';

export default function useSelectAddtionalConditons() {
  const [additionalCondtions, setAdditionalCondtions] = useRecoilState<SuggestForm['additionalCondtions']>(
    SuggestFormSelector('additionalCondtions'),
  );

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));
  const realestateTypes = useRecoilValue<SuggestForm['realestateTypes']>(SuggestFormSelector('realestateTypes'));
  const purpose = useRecoilValue<SuggestForm['purpose']>(SuggestFormSelector('purpose'));

  const handleClickHashTag = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEqualValue(value, '원하는 조건이 없어요!')) {
          if (additionalCondtions.includes(value)) {
            setAdditionalCondtions((prev) => prev.filter((ele) => ele !== value));
          } else {
            setAdditionalCondtions(['원하는 조건이 없어요!']);
          }
        } else {
          const list = additionalCondtions.includes('원하는 조건이 없어요!')
            ? [value]
            : getIncludeValue(value, additionalCondtions)
            ? additionalCondtions.filter((ele) => ele !== value)
            : [...additionalCondtions, value];

          setAdditionalCondtions(list);
        }
      }
    },
    [additionalCondtions, setAdditionalCondtions],
  );

  const list = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      if (isEqualValue(buyOrRent, BuyOrRent.Jeonsae)) {
        return DanjiJeonsaeOptions;
      }

      if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
        if (isEqualValue(purpose, '실거주')) {
          return DanjiBuyMoveInDateOptions;
        }

        if (isEqualValue(purpose, '투자')) {
          return DanjiBuyInvestOptions;
        }
      }
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      if (isEqualValue(buyOrRent, BuyOrRent.Jeonsae)) {
        if (
          getIncludeValue(RealestateType.Apartment, realestateTypes) ||
          getIncludeValue(RealestateType.Officetel, realestateTypes)
        ) {
          return RegionJeonsaeApartOptions;
        }

        if (
          getIncludeValue(RealestateType.Dasaedae, realestateTypes) ||
          getIncludeValue(RealestateType.Dandok, realestateTypes) ||
          getIncludeValue(RealestateType.Dagagoo, realestateTypes) ||
          getIncludeValue(RealestateType.Yunrip, realestateTypes)
        ) {
          return RegionJeonsaeNotApartOptions;
        }
      }

      if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
        if (isEqualValue(purpose, '실거주')) {
          if (
            getIncludeValue(RealestateType.Apartment, realestateTypes) ||
            getIncludeValue(RealestateType.Officetel, realestateTypes)
          ) {
            return RegionBuyApartMoveInDateOptions;
          }

          if (
            getIncludeValue(RealestateType.Dasaedae, realestateTypes) ||
            getIncludeValue(RealestateType.Dandok, realestateTypes) ||
            getIncludeValue(RealestateType.Dagagoo, realestateTypes) ||
            getIncludeValue(RealestateType.Yunrip, realestateTypes)
          ) {
            return RegionBuyNotApartMoveInDateOptions;
          }
        }

        if (isEqualValue(purpose, '투자')) {
          if (
            getIncludeValue(RealestateType.Apartment, realestateTypes) ||
            getIncludeValue(RealestateType.Officetel, realestateTypes)
          ) {
            return RegionBuyApartInvestOptions;
          }

          if (
            getIncludeValue(RealestateType.Dasaedae, realestateTypes) ||
            getIncludeValue(RealestateType.Dandok, realestateTypes) ||
            getIncludeValue(RealestateType.Dagagoo, realestateTypes) ||
            getIncludeValue(RealestateType.Yunrip, realestateTypes)
          ) {
            return RegionBuyNotApartInvestOptions;
          }
        }
      }
    }

    return [];
  }, [buyOrRent, danjiOrRegion, purpose, realestateTypes]);

  return { list, selectedList: additionalCondtions, handleClickHashTag };
}
