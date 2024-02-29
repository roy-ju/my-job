import tw, { styled } from 'twin.macro';

import Plus24 from '@/assets/icons/plus_24.svg';

import FabButton from '@/components/atoms/FabButton/FabButton';

const StickyContainer = styled.div`
  ${tw`sticky bottom-4 right-4`}
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
      <FabButton onClick={handleClick} type={isScrollingButton ? 'none' : 'extended'}>
        <Plus24 /> {!isScrollingButton && '집 구해요 등록'}
      </FabButton>
    </StickyContainer>
  );
}
