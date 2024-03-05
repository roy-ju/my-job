import tw, { styled } from 'twin.macro';

import { Button } from '@/components/atoms';

import { Information } from '@/components/molecules';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

const NoDataWrraper = styled.div`
  ${tw`flex-1`}
`;

const InformationWrraper = styled.div`
  ${tw`pt-12 pb-10`}
`;

const TextsWrraper = styled.div`
  ${tw`flex flex-col items-center gap-4 text-center`}
`;

const Column = styled.div`
  ${tw`flex flex-col gap-2`}
`;

export default function NoData({ onClickSuggestForm }: { onClickSuggestForm?: () => void }) {
  return (
    <NoDataWrraper>
      <InformationWrraper>
        <Information>
          <TextsWrraper>
            <ExclamationMark />
            <Column>
              <Information.Title>대화 중인 채팅이 없습니다.</Information.Title>
              <Information.Contents>구해요 글을 올리고 중개사님과 채팅을 개설해 보세요.</Information.Contents>
            </Column>
          </TextsWrraper>
          <Button onClick={onClickSuggestForm} tw="mx-auto mt-5 h-10">
            새로운 매물 추천 받아보기
          </Button>
        </Information>
      </InformationWrraper>
    </NoDataWrraper>
  );
}
