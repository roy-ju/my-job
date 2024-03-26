import tw, { styled } from 'twin.macro';

import { InfiniteScroll, Button as ButtonBase } from '@/components/atoms';

export const List = styled(InfiniteScroll)`
  ${tw`flex-1 min-h-0 overflow-scroll`}

  & > div:not(:first-of-type) > button > div {
    ${tw`border-t border-t-gray-100`}
  }
`;

export const TabButton = styled(ButtonBase)(({ selected }) => [
  tw`h-12 px-3 font-bold leading-none text-gray-600 transition-colors text-b1`,
  selected && tw`text-gray-1000`,
]);

export const ListItemButton = styled.button`
  ${tw`w-full px-5 bg-white text-start`}
`;

export const ListingTitle = styled.div`
  ${tw`text-info leading-3.5 text-gray-700 mt-4 whitespace-nowrap overflow-hidden text-ellipsis`}
`;

export const Title = styled.div`
  ${tw`text-b2 leading-5 mt-2.5 overflow-hidden text-ellipsis whitespace-pre-wrap break-words [display: -webkit-box] [-webkit-line-clamp: 2] [-webkit-box-orient: vertical]`}
`;

export const Message = styled.div`
  ${tw`text-info leading-4.5 text-gray-700 mt-1 break-words whitespace-pre-line`}
`;

export const CreatedTime = styled.div`
  ${tw`flex items-center gap-2 ml-auto`}
`;

export const Row = styled.div`
  ${tw`flex gap-1`}
`;

export const RowCenter = styled.div`
  ${tw`flex items-center`}
`;

export const Column = styled.div`
  ${tw`flex flex-col py-5`}
`;

export const TabWrraper = styled.div`
  ${tw`mt-2`}
`;
