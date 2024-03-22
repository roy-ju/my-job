import BulbImage from '@/../public/static/images/subhome_bulb.png';

import DictImage from '@/../public/static/images/subhome_dict.png';

import HomeImage from '@/../public/static/images/subhome_home.png';

import StampImage from '@/../public/static/images/subhome_stamp.png';
import Image from 'next/image';

import { Box, Flex, PreviewContainer, PreviewIconWrraper } from './widget/PreviewWidget';

export default function Preview() {
  return (
    <PreviewContainer>
      <Box tw="px-4">
        <Flex>
          <PreviewIconWrraper>
            <Image src={HomeImage.src} width={51.2} height={51.2} alt="homeImage" />
            거래 절차
          </PreviewIconWrraper>
          <PreviewIconWrraper>
            <Image src={BulbImage.src} width={51.2} height={51.2} alt="bulbImage" />
            부동산 상식
          </PreviewIconWrraper>
          <PreviewIconWrraper>
            <Image src={StampImage.src} width={51.2} height={51.2} alt="stampImage" />
            계약서
          </PreviewIconWrraper>
          <PreviewIconWrraper>
            <Image src={DictImage.src} width={51.2} height={51.2} alt="dictImage" />
            용어사전
          </PreviewIconWrraper>
        </Flex>
      </Box>
    </PreviewContainer>
  );
}
