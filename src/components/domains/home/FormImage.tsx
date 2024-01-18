import { useMemo } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import Apartment from '@/../public/static/images/home/image_house_apartment.png';

import Officetels from '@/../public/static/images/home/image_house_officetels.png';

import Villa from '@/../public/static/images/home/image_house_villa.png';

import MultiFamilyHouse from '@/../public/static/images/home/image_house_MultiFamilyHouse.png';

import DetachedHouse from '@/../public/static/images/home/image_house_DetachedHouse.png';

import Buy from '@/../public/static/images/home/image_signboard_purchase.png';

import Rent from '@/../public/static/images/home/image_signboard_rent.png';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import Logo from '@/../public/static/images/home/changed_animation_logo.gif';

type FormImageProps = {
  property: string[];
  buyOrRent: string;
};

function makeValue(value: string) {
  if (value === RealestateType.Apartment.toString()) return 'apart';

  if (value === RealestateType.Officetel.toString()) return 'officetel';

  if (value === RealestateType.Dasaedae.toString()) return 'villa';

  if (value === RealestateType.Yunrip.toString()) return 'villa';

  if (value === RealestateType.Dagagoo.toString()) return 'dagagoo';

  if (value === RealestateType.Dandok.toString()) return 'dandok';
  return '';
}

export default function FormImage({ property, buyOrRent }: FormImageProps) {
  const properyImageType = useMemo(() => makeValue(property[property.length - 1]), [property]);

  const buyOrRentImageType = useMemo(() => {
    if (buyOrRent === BuyOrRent.Buy.toString()) {
      return 'buy';
    }

    if (buyOrRent === BuyOrRent.Jeonsae.toString()) {
      return 'rent';
    }

    return '';
  }, [buyOrRent]);

  const PropertyPaths: Record<string, string> = {
    apart: Apartment.src,
    officetel: Officetels.src,
    villa: Villa.src,
    dandok: DetachedHouse.src,
    dagagoo: MultiFamilyHouse.src,
  };

  const BuyOrRentPaths: Record<string, string> = {
    buy: Buy.src,
    rent: Rent.src,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      tw="[min-width: 120px] [min-height: 120px] rounded-2xl bg-white relative"
    >
      {property.length ? (
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
      ) : (
        !buyOrRent && (
          <Image
            key="logo"
            src={Logo}
            width={100}
            height={100}
            alt=""
            tw="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )
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
