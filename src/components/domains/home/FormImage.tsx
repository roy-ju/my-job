import { useMemo } from 'react';

import { motion } from 'framer-motion';

import Apartment from '@/../public/static/images/image_house_apartment.png';

import Oneroom from '@/../public/static/images/image_house_oneroom.png';

import Etc from '@/../public/static/images/image_house_etc.png';

import Buy from '@/../public/static/images/image_signboard_purchase.png';

import Rent from '@/../public/static/images/image_signboard_rent.png';
import { RealestateType } from '@/constants/enums';
import getIncludeValue from '../suggest/utils/getIncludeValue';

type FormImageProps = {
  property: string[];
  buyOrRent: string;
};

export default function FormImage({ property, buyOrRent }: FormImageProps) {
  const properyImageType = useMemo(() => {
    if (getIncludeValue(RealestateType.Apartment.toString(), property)) {
      return 'apart';
    }

    if (getIncludeValue(RealestateType.Officetel.toString(), property)) {
      return 'apart';
    }

    if (getIncludeValue(RealestateType.Dasaedae.toString(), property)) {
      return 'oneroom';
    }

    if (getIncludeValue(RealestateType.Yunrip.toString(), property)) {
      return 'oneroom';
    }

    if (getIncludeValue(RealestateType.Dagagoo.toString(), property)) {
      return 'oneroom';
    }

    if (getIncludeValue(RealestateType.Dandok.toString(), property)) {
      return 'etc';
    }

    return '';
  }, [property]);

  const buyOrRentImageType = useMemo(() => {
    if (buyOrRent === '1') {
      return 'buy';
    }

    if (buyOrRent === '2') {
      return 'rent';
    }

    return '';
  }, [buyOrRent]);

  const PropertyPaths: Record<string, string> = {
    apart: Apartment.src,
    oneroom: Oneroom.src,
    etc: Etc.src,
  };

  const BuyOrRentPaths: Record<string, string> = {
    buy: Buy.src,
    rent: Rent.src,
  };

  if (property.length === 0 && !buyOrRent) {
    return (
      <div tw="[min-width: 120px] [min-height: 120px] rounded-2xl bg-white">
        <p tw="text-display_03 text-gray-500 text-center [padding-block: 39px]">?</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      tw="[min-width: 120px] [min-height: 120px] rounded-2xl bg-white relative"
    >
      {!!property.length && (
        <motion.img
          key={PropertyPaths[properyImageType]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={PropertyPaths[properyImageType]}
          width={100}
          height={100}
          alt=""
          tw="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {buyOrRent && (
        <motion.img
          key={BuyOrRentPaths[buyOrRentImageType]}
          initial={{ left: 0, bottom: 10 }}
          animate={{ left: 60, bottom: 10 }}
          transition={{ duration: 0.5 }}
          src={BuyOrRentPaths[buyOrRentImageType]}
          width={50}
          height={50}
          alt=""
          tw="absolute"
        />
      )}
    </motion.div>
  );
}
