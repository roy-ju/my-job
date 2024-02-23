import tw, { styled } from 'twin.macro';

import { ButtonV2 } from '@/components/atoms';

import Plus24 from '@/assets/icons/plus_24.svg';

const StickyContainer = styled.div`
  ${tw`sticky bottom-4 right-4`}
`;

const TransitionNoneButton = styled(ButtonV2)`
  ${tw`ml-auto mr-4 transition-none`}
`;

export default function SuggestCreate({
  isScrollingButton,
  handleClick,
}: {
  isScrollingButton: boolean;
  handleClick: () => void;
}) {
  return isScrollingButton ? (
    <StickyContainer>
      <TransitionNoneButton onClick={handleClick} tw="w-12 h-12 px-0 [border-radius: 50%]">
        <Plus24 />
      </TransitionNoneButton>
    </StickyContainer>
  ) : (
    <StickyContainer>
      <TransitionNoneButton onClick={handleClick} radius="r100" tw="[width: 142px] flex items-center gap-1">
        <Plus24 />집 구해요 등록
      </TransitionNoneButton>
    </StickyContainer>
  );
}
