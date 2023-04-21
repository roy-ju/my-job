import { GetListingQnaListResponse } from '@/apis/listing/getListingQnaList';
import { Button, Chip, Loading } from '@/components/atoms';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export interface ListItemProps {
  item?: NonNullable<GetListingQnaListResponse['list']>[0];
}

function ListItem() {
  return (
    <div tw="py-4">
      <div tw="flex flex-col gap-2">
        <div tw="flex justify-between items-center">
          <Chip variant="gray">답변 대기중</Chip>
          <Button variant="ghost" size="none" tw="underline text-info">
            삭제
          </Button>
        </div>
        <div tw="text-b2">
          매물문의에는 어떤 것들이 매물문의에는 어떤 것들이 매물문의에는 어떤 것들이 매물문의에는 어떤 것들이
          매물문의에는 어떤 것매물문의에는 어떤 것들이
        </div>
        <div tw="flex items-center gap-2 text-info text-gray-700">
          <div>닉네임</div>
          <div>2022.03.23</div>
        </div>
      </div>
    </div>
  );
}

export interface QnaProps {
  isLoading?: boolean;
  qnaList?: GetListingQnaListResponse['list'];
  onClickCreateQna?: () => void;
}

export default function Qna({ qnaList, isLoading, onClickCreateQna }: QnaProps) {
  const qnaSize = qnaList?.length ?? 0;

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div tw="flex justify-between">
        <div tw="font-bold">매물문의</div>
        <Button variant="outlined" size="small" onClick={onClickCreateQna}>
          문의하기
        </Button>
      </div>
      {qnaSize > 0 ? (
        <ListContainer>
          <ListItem />
          <ListItem />
        </ListContainer>
      ) : (
        <div tw="text-b2 text-gray-700 h-12 my-4 flex items-center justify-center">매물문의 내역이 없습니다.</div>
      )}
      {qnaSize > 5 && (
        <Button tw="w-full" variant="outlined">
          더보기
        </Button>
      )}
    </div>
  );
}
