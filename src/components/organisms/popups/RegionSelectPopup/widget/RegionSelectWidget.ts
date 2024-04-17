import tw, { styled } from 'twin.macro';

import SelectTag from '@/components/atoms/SelectTag';

export const HeaderContainer = styled.section`
  ${tw``}
`;

export const BreadCrumbsContainer = styled.section`
  ${tw`[height: 62px]`}
`;

export const BreadCrumbsWrraper = styled.div`
  ${tw`flex items-center h-full`}

  span {
    ${tw`flex-1 text-center text-gray-700 text-body_02`}
  }
`;

export const ListContainer = styled.section`
  ${tw`flex-1 min-h-0`}
`;

export const ListVerticalHorizontalSeperator = styled.div`
  ${tw`h-full w-px [background: #D9D9D9]`}
`;

export const ListOuterWrraper = styled.div`
  ${tw`flex h-full min-h-0`}
`;

export const ListInnerWrraper = styled.div`
  ${tw`flex-1 h-full min-h-0 overflow-auto`}

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-500`}
  }
`;

export const SelectedRegionsContainer = styled.div`
  ${tw`py-4`}
`;

export const SelectedRegionsTitleWrraper = styled.div`
  ${tw`flex flex-row items-center gap-4 px-5`}

  div:nth-of-type(1) {
    ${tw`flex flex-row gap-1 text-subhead_02`}
  }

  div:nth-of-type(2) {
    ${tw`text-gray-600 text-body_01`}
  }
`;

export const SelectedRegionText = styled.span`
  ${tw`text-gray-900`}
`;

export const SelectedRegionCountText = styled.span`
  ${tw`text-nego-800`}
`;

export const ScrollContainer = styled.div`
  ${tw`flex flex-row items-center gap-2 px-5 overflow-x-auto cursor-pointer`}
  transition: scroll 0.2s ease;
`;

export const CtaWrraper = styled.div`
  ${tw`px-5 pt-3`}
`;

export const SelectedRegionsTag = styled(SelectTag)`
  ${tw`whitespace-nowrap transition-all [transition-duration: 200ms] cursor-default`}
`;
