import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';
import {
  DanjiBuyOptions,
  DanjiJeonsaeOptions,
  HashTagTitleObj,
  RegionApartmentBuyOptions,
  RegionApartmentJeonsaeOptions,
  RegionCommonBuyOptions,
  RegionCommonJeonsaeOptions,
  RegionDandokBuyOptions,
  RegionOfficetelVillaDagagooBuyOptions,
  RegionOfficetelVillaDagagooJeonsaeOptions,
} from '@/components/domains/suggest/form/constants/hashtags';

import isEqualValue from '@/components/domains/suggest/utils/isEqualValue';

export default function getSelectedAdditionConditions({
  danjiOrRegion,
  buyOrRent,
  realestateType,
  selectedConditions,
}: {
  danjiOrRegion: DanjiOrRegionalType | 0;
  buyOrRent: BuyOrRent | 0;
  realestateType: number[];
  selectedConditions: string[];
}) {
  if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
    if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
      return [
        {
          title: '',
          list: selectedConditions.filter((ele) => DanjiBuyOptions.includes(ele)).join(' / '),
        },
      ];
    }

    if (isEqualValue(buyOrRent, BuyOrRent.Jeonsae)) {
      return [
        {
          title: '',
          list: selectedConditions.filter((ele) => DanjiJeonsaeOptions.includes(ele)).join(' / '),
        },
      ];
    }

    return null;
  }

  if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
    const arr = [];

    const convertedRealestateType = [...realestateType].sort((a, b) => a - b);

    if (isEqualValue(buyOrRent, BuyOrRent.Buy)) {
      arr.push({
        title: HashTagTitleObj.common,
        list: selectedConditions.filter((ele) => RegionCommonBuyOptions.includes(ele)).join(' / '),
      });

      if (convertedRealestateType.includes(RealestateType.Apartment)) {
        arr.push({
          title: HashTagTitleObj.apartment,
          list: selectedConditions.filter((ele) => RegionApartmentBuyOptions.includes(ele)).join(' / '),
        });
      }

      if (
        convertedRealestateType.includes(RealestateType.Officetel) ||
        convertedRealestateType.includes(RealestateType.Dasaedae) ||
        convertedRealestateType.includes(RealestateType.Dagagoo) ||
        convertedRealestateType.includes(RealestateType.Yunrip)
      ) {
        arr.push({
          title: HashTagTitleObj.officetelVillaDagagoo,
          list: selectedConditions.filter((ele) => RegionOfficetelVillaDagagooBuyOptions.includes(ele)).join(' / '),
        });
      }

      if (convertedRealestateType.includes(RealestateType.Dandok)) {
        arr.push({
          title: HashTagTitleObj.dandok,
          list: selectedConditions.filter((ele) => RegionDandokBuyOptions.includes(ele)).join(' / '),
        });
      }

      return arr;
    }

    if (isEqualValue(buyOrRent, BuyOrRent.Jeonsae)) {
      arr.push({
        title: HashTagTitleObj.common,
        list: selectedConditions.filter((ele) => RegionCommonJeonsaeOptions.includes(ele)).join(' / '),
      });

      if (convertedRealestateType.includes(RealestateType.Apartment)) {
        arr.push({
          title: HashTagTitleObj.apartment,
          list: selectedConditions.filter((ele) => RegionApartmentJeonsaeOptions.includes(ele)).join(' / '),
        });
      }

      if (
        convertedRealestateType.includes(RealestateType.Officetel) ||
        convertedRealestateType.includes(RealestateType.Dasaedae) ||
        convertedRealestateType.includes(RealestateType.Dagagoo) ||
        convertedRealestateType.includes(RealestateType.Yunrip)
      ) {
        arr.push({
          title: HashTagTitleObj.officetelVillaDagagoo,
          list: selectedConditions.filter((ele) => RegionOfficetelVillaDagagooJeonsaeOptions.includes(ele)).join(' / '),
        });
      }

      if (convertedRealestateType.includes(RealestateType.Dandok)) {
        arr.push({
          title: HashTagTitleObj.dandok,
          list: selectedConditions.filter((ele) => RegionDandokBuyOptions.includes(ele)).join(' / '),
        });
      }

      return arr;
    }

    return null;
  }

  return null;
}
