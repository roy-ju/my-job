import { Button } from '@/components/atoms';

import { Information } from '@/components/molecules';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

import useChatRoomListNavigateHandler from '../../hooks/useChatRoomListNavigateHandler';

export default function NoData() {
  const { handleClickSuggestForm } = useChatRoomListNavigateHandler();

  return (
    <div tw="flex-1">
      <div tw="pt-12 pb-10">
        <Information>
          <div tw="flex flex-col gap-4 items-center text-center">
            <ExclamationMark />
            <div tw="flex flex-col gap-2">
              <Information.Title>대화 중인 채팅이 없습니다.</Information.Title>
              <Information.Contents>구해요 글을 올리고 중개사님과 채팅을 개설해 보세요.</Information.Contents>
            </div>
          </div>
          <Button onClick={handleClickSuggestForm} tw="mx-auto mt-5 h-10">
            새로운 매물 추천 받아보기
          </Button>
        </Information>
      </div>
    </div>
  );
}
