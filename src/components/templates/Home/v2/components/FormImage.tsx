import { useMemo } from 'react';

import { motion } from 'framer-motion';

import Apartment from '@/../public/static/images/image_house_apartment.png';

import Oneroom from '@/../public/static/images/image_house_oneroom.png';

import Etc from '@/../public/static/images/image_house_etc.png';

import Buy from '@/../public/static/images/image_signboard_purchase.png';

import Rent from '@/../public/static/images/image_signboard_rent.png';

type FormImageProps = {
  realestateTypes: string;
  buyOrRents: string;
};

export default function FormImage({ realestateTypes, buyOrRents }: FormImageProps) {
  const realestateImageType = useMemo(() => {
    if (realestateTypes === '아파트/오피스텔') {
      return 'apart';
    }

    if (realestateTypes === '원룸/투룸') {
      return 'oneroom';
    }

    if (realestateTypes === '그외') {
      return 'etc';
    }

    return '';
  }, [realestateTypes]);

  const buyOrRentsImageType = useMemo(() => {
    if (buyOrRents === '매매') {
      return 'buy';
    }

    if (buyOrRents === '전월세') {
      return 'rent';
    }

    return '';
  }, [buyOrRents]);

  const realestatePaths: Record<string, string> = {
    apart: Apartment.src,
    oneroom: Oneroom.src,
    etc: Etc.src,
  };

  const buyOrRentsPaths: Record<string, string> = {
    buy: Buy.src,
    rent: Rent.src,
  };

  if (!realestateTypes && !buyOrRents) {
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
      {realestateTypes && (
        <motion.img
          key={realestatePaths[realestateImageType]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={realestatePaths[realestateImageType]}
          width={100}
          height={100}
          alt=""
          tw="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {buyOrRents && (
        <motion.img
          key={buyOrRentsPaths[buyOrRentsImageType]}
          initial={{ left: 0, bottom: 10 }}
          animate={{ left: 60, bottom: 10 }}
          transition={{ duration: 0.5 }}
          src={buyOrRentsPaths[buyOrRentsImageType]}
          width={50}
          height={50}
          alt=""
          tw="absolute"
        />
      )}
    </motion.div>
  );
}
