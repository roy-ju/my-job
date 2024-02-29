import tw, { styled } from 'twin.macro';

import Plus24 from '@/assets/icons/plus_24.svg';

import FabButton from '@/components/atoms/FabButton/FabButton';

const MobileFixedContainer = styled.div`
  ${tw`fixed bottom-4 right-4`}
`;

const PcFixedContainer = styled.div`
  ${tw`fixed bottom-4 right-4`}
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
  const animate = {
    minWidth: isScrollingButton ? 48 : 142,
    width: isScrollingButton ? 48 : 142,
    height: 48,
    paddingLeft: isScrollingButton ? '0px' : '16px',
    paddingRight: isScrollingButton ? '0px' : '20px',
    transition: { type: 'tween', duration: 0.3 },
    scale: 1,
  };

  if (platform === 'mobile') {
    return (
      <MobileFixedContainer>
        <FabButton onClick={handleClick} animate={animate}>
          <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && '집 구해요 등록'}
        </FabButton>
      </MobileFixedContainer>
    );
  }

  return (
    <PcFixedContainer>
      <FabButton onClick={handleClick} animate={animate}>
        <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && '집 구해요 등록'}
      </FabButton>
    </PcFixedContainer>
  );
}
