import tw, { styled } from 'twin.macro';

import InfiniteScroll from '@/components/atoms/InfiniteScroll';

export const Container = styled.div`
  ${tw`flex flex-col flex-1 min-h-0`}
`;

export const ListWrraper = styled(InfiniteScroll)`
  ${tw`flex-1 min-h-0 -mx-5 overflow-y-scroll`}
`;

export const ListItemWrraper = styled.div`
  ${tw`bg-white`}
`;

export const ListItemButton = styled.button`
  ${tw`flex flex-col items-stretch w-full p-5 transition-colors text-start hover:bg-gray-50`}
`;

export const MainWrraper = styled.div`
  ${tw`flex items-center justify-between mb-2`}
`;

export const MainText = styled.div`
  ${tw`leading-none text-body_02`}
`;

export const Price = styled(MainText)`
  ${tw`text-nego-1000`}
`;

export const InfoWrraper = styled.div`
  ${tw`flex items-center gap-1.5 text-info leading-3.5 text-gray-700`}
`;

export const Seperator = styled.div`
  ${tw`w-px h-2 bg-gray-300`}
`;

export const Label = styled.span`
  ${tw`w-4 h-4 rounded-[4px] bg-nego text-[10px] text-white leading-none flex items-center justify-center`}
`;
