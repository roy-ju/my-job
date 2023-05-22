import { GetListingQnaListResponse } from '@/apis/listing/getListingQnaList';
import { Button, Chip, Loading, Moment } from '@/components/atoms';
import tw, { styled } from 'twin.macro';

const ListContainer = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

export interface ListItemProps {
  item?: NonNullable<GetListingQnaListResponse['list']>[0];
  onClickDelete?: () => void;
}

function ListItem({ item, onClickDelete }: ListItemProps) {
  return (
    <div tw="py-4">
      <div tw="flex flex-col gap-2">
        <div tw="flex justify-between items-center">
          {item?.agent_response_time ? <Chip>답변완료</Chip> : <Chip variant="gray">답변 대기중</Chip>}
          {item?.owner && (
            <Button onClick={onClickDelete} variant="ghost" size="none" tw="underline text-info">
              삭제
            </Button>
          )}
        </div>
        <div tw="text-b2 break-all">{item?.message}</div>
        <div tw="flex items-center gap-2 text-info text-gray-700">
          <div>{item?.user_nickname}</div>
          <div>
            <Moment format="relative">{item?.created_time}</Moment>
          </div>
        </div>
      </div>
      {item?.agent_response_time && (
        <div tw="flex flex-col gap-2 mt-5">
          <div tw="text-b2">{item?.agent_message}</div>
          <div tw="flex items-center gap-2 text-info text-gray-700">
            <div>중개사 답변</div>
            <div>
              <Moment format="relative">{item?.agent_response_time}</Moment>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export interface QnaProps {
  isOwner?: boolean;
  isLoading?: boolean;
  hasNext?: boolean;
  qnaList?: GetListingQnaListResponse['list'];
  onClickDeleteQna?: (id: number) => void;
  onClickCreateQna?: () => void;
  onClickNext?: () => void;
}

export default function Qna({
  isOwner = false,
  qnaList,
  hasNext,
  isLoading,
  onClickDeleteQna,
  onClickCreateQna,
  onClickNext,
}: QnaProps) {
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
        {!isOwner && (
          <Button variant="outlined" size="small" onClick={onClickCreateQna}>
            문의하기
          </Button>
        )}
      </div>
      {qnaSize > 0 ? (
        <ListContainer>
          {qnaList?.map((item) => (
            <ListItem key={item.id} item={item} onClickDelete={() => onClickDeleteQna?.(item.id)} />
          ))}
        </ListContainer>
      ) : (
        <div tw="text-b2 text-gray-700 h-12 my-4 flex items-center justify-center">매물문의 내역이 없습니다.</div>
      )}
      {hasNext && (
        <Button tw="w-full" variant="outlined" onClick={onClickNext}>
          더보기
        </Button>
      )}
    </div>
  );
}
