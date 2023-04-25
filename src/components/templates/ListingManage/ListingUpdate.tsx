import { Button, PersistentBottomBar } from '@/components/atoms';

interface Props {
  onClickChat?: () => void;
}

export default function ListingUpdate({ onClickChat }: Props) {
  return (
    <div tw="flex flex-col flex-1 min-h-0">
      <div tw="flex-1 overflow-auto px-5">
        <div tw="mb-5 font-bold">매물 수정</div>
        <div tw="text-b2 text-gray-700">
          희망가를 제외한 거래 및 매물 정보 수정은 중개사에게 요청하여 수정할 수 있습니다.
          <br />
          <br />
          희망가는 매물 상세 페이지의 ‘희망가 수정’ 버튼을 통해 수정할 수 있습니다.
        </div>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickChat}>
          중개사에 요청하러가기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
