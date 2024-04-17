import tw, { styled } from 'twin.macro';

export const HeaderContainer = styled.section`
  ${tw`pt-0`}
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
  ${tw`flex-1 h-full min-h-0 overflow-y-auto`}

  ::-webkit-scrollbar-thumb {
    ${tw`bg-gray-500`}
  }
`;

export const BackgroundContainer = styled.div`
  ${tw`w-full h-full bg-white shadow`}
`;

export const CtaWrraper = styled.div`
  ${tw`px-5 pt-3 pb-3`}
`;
