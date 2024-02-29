import tw, { styled } from 'twin.macro';

import Plus24 from '@/assets/icons/plus_24.svg';

import FabButton from '@/components/atoms/FabButton/FabButton';

const StickyContainer = styled.div`
  ${tw`fixed bottom-4 right-4`}
`;

export default function SuggestCreate({
  isScrollingButton,
  handleClick,
}: {
  isScrollingButton: boolean;
  handleClick: () => void;
}) {
  // return isScrollingButton ? (
  //   <StickyContainer>
  //     <FabButton onClick={handleClick} type={isScrollingButton ? 'none' : 'extended'}>
  //       <Plus24 />
  //     </FabButton>
  //   </StickyContainer>
  // ) : (
  //   <StickyContainer>
  //     <FabButton onClick={handleClick} type="extended">
  //       <Plus24 />집 구해요 등록
  //     </FabButton>
  //   </StickyContainer>
  // );

  return (
    <StickyContainer>
      {/* <motion.button
        initial={false}
        animate={{
          height: isScrollingButton ? 200 : 100,
          width: isScrollingButton ? 200 : 100,
        }}
      > */}
      <FabButton
        onClick={handleClick}
        animate={{
          minWidth: isScrollingButton ? 48 : 'auto',
          width: isScrollingButton ? 48 : 'auto',
          height: 48,
          paddingLeft: isScrollingButton ? '0px' : '16px',
          paddingRight: isScrollingButton ? '0px' : '16px',
          transition: { type: 'tween', duration: 0.5 },
          scale: 1,
        }}
        // css={[isScrollingButton ? tw`px-0` : tw`flex items-center gap-1 px-4`]}
      >
        <Plus24 style={{ width: '24px', height: '24px' }} /> {!isScrollingButton && '집 구해요 등록'}
      </FabButton>
    </StickyContainer>
  );
}
