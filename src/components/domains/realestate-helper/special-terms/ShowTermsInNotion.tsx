import { memo } from 'react';

import Image from 'next/image';

import TextButton from '@/components/atoms/TextButton';

import ContractImage from '@/../public/static/images/icon_contract.png';

import useWindowOpen from '@/hooks/useWindowOpen';

import { GrayBox, PaddingTwentyWrrapaer } from './widget/SpecialTermsWidget';

type ShowTermsInNotionProps = {
  title: string;
  url: string;
};

function ShowTermsInNotion({ title, url }: ShowTermsInNotionProps) {
  const { openWindowWithLink } = useWindowOpen();

  return (
    <PaddingTwentyWrrapaer id="test-test">
      <GrayBox onClick={() => openWindowWithLink(url)} tw="cursor-pointer">
        <Image alt="contractImage" src={ContractImage.src} width={48} height={48} />
        <div>
          <p>{title}</p>
          <TextButton variant="right" size="large" title="자세히 보기" color="nego800" />
        </div>
      </GrayBox>
    </PaddingTwentyWrrapaer>
  );
}

export default memo(ShowTermsInNotion);
