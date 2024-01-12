import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import SuggestForm from '../types';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import isEqualValue from '../../utils/isEqualValue';

import {
  DanjiBuyOptions,
  DanjiJeonsaeOptions,
  RegionApartmentBuyOptions,
  RegionApartmentJeonsaeOptions,
  RegionCommonBuyOptions,
  RegionCommonJeonsaeOptions,
  RegionDandokBuyOptions,
  RegionDandokJeonsaeOptions,
  RegionOfficetelVillaDagagooBuyOptions,
  RegionOfficetelVillaDagagooJeonsaeOptions,
} from '../constants/hashtags';

import getIncludeValue from '../../utils/getIncludeValue';

import addObjectIfKeyNotExists from '../../utils/addObjectIfKeyNotExists';

export default function useSelectAdditionalConditions() {
  const [additionalConditions, setadditionalConditions] = useRecoilState<SuggestForm['additionalConditions']>(
    SuggestFormSelector('additionalConditions'),
  );

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const buyOrRent = useRecoilValue<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));
  const realestateTypes = useRecoilValue<SuggestForm['realestateTypes']>(SuggestFormSelector('realestateTypes'));

  const handleClickHashTag = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (getIncludeValue(value, additionalConditions)) {
          setadditionalConditions((prev) => prev.filter((ele) => ele !== value));
        } else {
          setadditionalConditions((prev) => [...prev, value]);
        }
      }
    },
    [additionalConditions, setadditionalConditions],
  );

  const list: { [key: string]: string[] }[] = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
        return [{ danjiBuy: DanjiBuyOptions }];
      }
      return [{ danjiJeonsae: DanjiJeonsaeOptions }];
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
        const array = [{ common: RegionCommonBuyOptions }];

        if (getIncludeValue(RealestateType.Apartment, realestateTypes)) {
          addObjectIfKeyNotExists(array, 'apartment', RegionApartmentBuyOptions);
        }

        if (
          getIncludeValue(RealestateType.Officetel, realestateTypes) ||
          getIncludeValue(RealestateType.Dasaedae, realestateTypes) ||
          getIncludeValue(RealestateType.Dagagoo, realestateTypes) ||
          getIncludeValue(RealestateType.Yunrip, realestateTypes)
        ) {
          addObjectIfKeyNotExists(array, 'officetelVillaDagagoo', RegionOfficetelVillaDagagooBuyOptions);
        }

        if (getIncludeValue(RealestateType.Dandok, realestateTypes)) {
          addObjectIfKeyNotExists(array, 'dandok', RegionDandokBuyOptions);
        }

        return array;
      }

      const array = [{ common: RegionCommonJeonsaeOptions }];

      if (getIncludeValue(RealestateType.Apartment, realestateTypes)) {
        addObjectIfKeyNotExists(array, 'apartment', RegionApartmentJeonsaeOptions);
      }

      if (
        getIncludeValue(RealestateType.Officetel, realestateTypes) ||
        getIncludeValue(RealestateType.Dasaedae, realestateTypes) ||
        getIncludeValue(RealestateType.Dagagoo, realestateTypes) ||
        getIncludeValue(RealestateType.Yunrip, realestateTypes)
      ) {
        addObjectIfKeyNotExists(array, 'officetelVillaDagagoo', RegionOfficetelVillaDagagooJeonsaeOptions);
      }

      if (getIncludeValue(RealestateType.Dandok, realestateTypes)) {
        addObjectIfKeyNotExists(array, 'dandok', RegionDandokJeonsaeOptions);
      }

      return array;
    }

    return [];
  }, [buyOrRent, danjiOrRegion, realestateTypes]);

  return { list, selectedList: additionalConditions, handleClickHashTag };
}
