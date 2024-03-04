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

export default function SuggestCreate({
  platform,
  isScrollingButton,
  handleClick,
}: {
  platform: string;
  isScrollingButton: boolean;
  handleClick: () => void;
}) {
  const isNaitveApp = useIsNativeApp();

  const [fixedRight, setFixedRight] = useState(0);

  const animate = {
    minWidth: isScrollingButton ? 48 : 142,
    width: isScrollingButton ? 48 : 142,
    height: 48,
    paddingLeft: isScrollingButton ? '0px' : '16px',
    paddingRight: isScrollingButton ? '0px' : '20px',
    transition: { type: 'tween', duration: 0.3 },
    scale: 1,
  };

  useEffect(() => {
    if (platform === 'pc') {
      const handleResize = () => {
        const parentElement = document.getElementById('negocio-my-suggest-requestedList');

        if (parentElement) {
          const rightPosition = window.innerWidth - parentElement.getBoundingClientRect().right;
          setFixedRight(rightPosition + 16);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [platform]);

  if (platform === 'mobile') {
    return (
      <MobileFixedContainer css={[isNaitveApp && isIOS() && tw`[bottom: 49px]`]}>
        <FabButton onClick={handleClick} animate={animate}>
          <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && '집 구해요 등록'}
        </FabButton>
      </MobileFixedContainer>
    );
  }

  return (
    <PcFixedContainer style={{ right: fixedRight }}>
      <FabButton onClick={handleClick} animate={animate}>
        <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && '집 구해요 등록'}
      </FabButton>
    </PcFixedContainer>
  );
}
