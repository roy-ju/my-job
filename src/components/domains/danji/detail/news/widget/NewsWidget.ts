import Link from 'next/link';

import tw, { styled } from 'twin.macro';

export const Column = styled.div`
  ${tw`flex flex-col`}
`;

export const Title = styled.h2`
  ${tw`px-5 mb-1 text-subhead_03`}
`;

export const ListContainer = styled(Column)`
  ${tw`py-10`}
`;

export const BottomDiv = styled.div`
  ${tw`[min-height: 114px]`}
`;

export const ButtonWrraper = styled(Column)`
  ${tw`w-full h-10 gap-4 px-5 mt-1`}
`;

export const StyledLink = styled(Link)`
  b {
    ${tw`[font-weight: inherit]`}
  }

  :hover {
    .news-title {
      ${tw`[text-decoration-line: underline]`}
    }
    p {
      ${tw`text-gray-1000`}
    }
  }
`;

export const ImageWrraper = styled.div`
  ${tw`relative w-[80px] h-[80px] min-w-[80px] min-h-[80px]`}
`;

export const Image = styled.img`
  ${tw`w-full h-full absolute top-0 left-0 [object-fit: cover] rounded-lg`}
`;

export const NewsTitle = styled.div`
  ${tw`mb-1 text-subhead_02 line-clamp-1`}
`;

export const NewsDescription = styled.div`
  ${tw`text-gray-700 text-body_01 line-clamp-2`}
`;

export const NewsDate = styled.div`
  ${tw`text-gray-600 text-info`}
`;

export const FullDiv = styled.div`
  ${tw`w-full`}
`;

export const FlexGapFour = styled.div`
  ${tw`flex gap-4`}
`;

export const SeperatorWithContents = styled.div`
  ${tw`border-b mx-5 last-of-type:[display: none]`}
`;
