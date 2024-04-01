import { useEffect, useState } from 'react';

import tw, { styled } from 'twin.macro';

import Plus24 from '@/assets/icons/plus_24.svg';

import FabButton from '@/components/atoms/FabButton/FabButton';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import isIOS from '@/utils/isIos';

const MobileFixedContainer = styled.div`
  ${tw`fixed bottom-4 right-4`}
`;

const PcFixedContainer = styled.div`
  ${tw`fixed bottom-4`}
`;

export default function BottomFixedAnimationButton({
  containerId,
  buttonId,
  ctaTitle,
  width,
  platform,
  isScrollingButton = false,
  handleClick,
}: {
  containerId: string;
  buttonId?: string;
  ctaTitle: string;
  width: number;
  platform: string;
  isScrollingButton?: boolean;
  handleClick: () => void;
}) {
  const isNaitveApp = useIsNativeApp();

  const [fixedRight, setFixedRight] = useState(0);

  const animate = {
    minWidth: isScrollingButton ? 48 : width,
    width: isScrollingButton ? 48 : width,
    height: 48,
    paddingLeft: isScrollingButton ? '0px' : '16px',
    paddingRight: isScrollingButton ? '0px' : '20px',
    transition: { type: 'tween', duration: 0.3 },
    scale: 1,
  };

  useEffect(() => {
    if (platform === 'pc') {
      const handleResize = () => {
        const parentElement = document.getElementById(containerId);

        if (parentElement) {
          const rightPosition = window.innerWidth - parentElement.getBoundingClientRect().right;
          setFixedRight(rightPosition + 16);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [containerId, platform]);

  if (platform === 'mobile') {
    return (
      <MobileFixedContainer css={[isNaitveApp && isIOS() && tw`[bottom: 49px]`]}>
        <FabButton onClick={handleClick} animate={animate} id={buttonId}>
          <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && `${ctaTitle}`}
        </FabButton>
      </MobileFixedContainer>
    );
  }

  return (
    <PcFixedContainer style={{ right: fixedRight }}>
      <FabButton onClick={handleClick} animate={animate} id={buttonId}>
        <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && `${ctaTitle}`}
      </FabButton>
    </PcFixedContainer>
  );
}
