import tw, { styled } from 'twin.macro';

export const PaddingTwentyWrrapaer = styled.div`
  ${tw`px-5`}
`;

export const GrayBox = styled.div`
  ${tw`flex flex-row items-center gap-3 p-4 bg-gray-100 rounded-2xl`}

  div {
    ${tw`flex flex-col gap-0.5 items-start`}
  }

  > div > p {
    ${tw`text-gray-800 text-subhead_03`}
  }
`;

export const TitlesWrraper = styled.div`
  ${tw`flex flex-col gap-1 px-5`}

  p:nth-of-type(1) {
    ${tw`text-gray-900 text-heading_01`}
  }

  p:nth-of-type(2) {
    ${tw`text-gray-700 text-body_02`}
  }
`;

export const ListItemWrraper = styled.div`
  ${tw`pt-5`}
`;

export const ListTitle = styled.p`
  ${tw`px-5 pt-5 mb-2 text-gray-700 text-body_02`}
`;

export const SpecialContentsParagraph = styled.div`
  ${tw`p-5 text-gray-700 whitespace-pre-line bg-gray-100 text-body_02 rounded-2xl`}
`;

export const TabsContainer = styled.div`
  ${tw`sticky top-0 z-10 flex w-full py-4 bg-white`}

  -webkit-transform: translateZ(0);

  transform: translateZ(0);
`;

export const ScrollContainer = styled.div`
  ${tw`z-10 flex flex-row items-center gap-2 px-5 overflow-x-auto`}
  transition: scroll 0.2s ease;
`;
