import tw, { styled } from 'twin.macro';

import AddIcon from '@/assets/icons/home_add.svg';

import NewIcon from '@/assets/icons/home_new.svg';

const CountsContainer = styled.div`
  ${tw`flex items-center justify-between w-full h-12 gap-2 px-4 bg-gray-100 rounded-lg`}
`;

const CountWrraper = styled.div`
  ${tw`flex flex-row items-center gap-1 [margin-left: auto] text-subhead_01`}
`;

export default function SuggestCounts({ newCount, allCount }: { newCount: number; allCount: number }) {
  if (!newCount && !allCount) return null;

  return (
    <CountsContainer>
      <p tw="text-body_02 text-gray-700">추천 현황</p>

      <div tw="flex items-center gap-2">
        {!!newCount && (
          <CountWrraper>
            <NewIcon />
            <p tw="text-red-800">신규 {newCount > 99 ? '99+' : newCount}</p>
          </CountWrraper>
        )}

        {!!allCount && (
          <CountWrraper>
            <AddIcon />
            <p tw="text-nego-800">전체 {allCount > 99 ? '99+' : allCount}</p>
          </CountWrraper>
        )}
      </div>
    </CountsContainer>
  );
}
