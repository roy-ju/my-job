import tw, { styled, theme } from 'twin.macro';

import ArrowRightIcon from '@/assets/icons/arrow_right_20.svg';

export const CommonContainer = styled.div`
  ${tw`w-full fixed flex flex-row items-center py-3 pl-5 pr-4 bg-gray-100 top-14 [z-index: 200] justify-between`}
`;

export const ScrollingContainer = styled(CommonContainer)`
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.12);
`;

export const MainWrraper = styled.div`
  ${tw`flex flex-row items-center gap-2 pr-4 truncate`}
`;

export const Title = styled.div`
  ${tw`truncate text-subhead_02`}
`;

/** 스크롤링 관련해서 끊김현상 */
export const VirtualDiv = styled.div`
  ${tw`w-full [min-height: 46px]`}
`;

export function ArrowButton() {
  return (
    <button type="button">
      <ArrowRightIcon color={theme`colors.gray.700`} />
    </button>
  );
}
