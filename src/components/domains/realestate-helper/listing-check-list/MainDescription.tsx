import Image from 'next/image';

import tw from 'twin.macro';

import Bed from '@/../public/static/images/icon_bed.png';

import FileIndex from '@/../public/static/images/icon_file-index.png';

import Fridge from '@/../public/static/images/icon_fridge.png';

import HouseGarden from '@/../public/static/images/icon_house-garden.png';

import Sofa from '@/../public/static/images/icon_sofa.png';

import Sparkles from '@/../public/static/images/icon_sparkles.png';

import Toilet from '@/../public/static/images/icon_toilet.png';

import Washer from '@/../public/static/images/icon_washer.png';

import WorldMap from '@/../public/static/images/icon_worldmap.png';

import { useMemo } from 'react';
import { Flex, SubTitle } from './widget/ListingCheckListWidget';

type MainDescriptionProps = {
  tab: string;
  code: string;
  title?: string;
  subTitle?: string;
};

export default function MainDescription({ tab, code, title = '', subTitle = '' }: MainDescriptionProps) {
  const imgUrl = useMemo(() => {
    if (title === '거실') return Sofa.src;

    if (title === '주방') return Fridge.src;

    if (title === '다용도실/베란다') return Washer.src;

    if (title === '입지환경') return WorldMap.src;

    if (title === '기타') return FileIndex.src;

    if (title === '방') return Bed.src;

    if (title === '화장실') return Toilet.src;

    if (title === '건물외부/내부') return HouseGarden.src;

    if (title === '풀옵션') return Sparkles.src;

    return '';
  }, [title]);

  return (
    <Flex css={[tab !== code && tw`[display: none]`]}>
      {imgUrl && <Image src={imgUrl} alt="mainDescriptionImage" width={48} height={48} />}
      <SubTitle>
        {title && <span>{title}</span>}
        {subTitle && <span>{subTitle}</span>}
      </SubTitle>
    </Flex>
  );
}
