import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { Dropdown } from '@/components/molecules';
import { useState } from 'react';

interface Props {
  onClickReport?: () => void;
  onClickDelete?: (reason: string) => void;
}

export default function ListingDelete({ onClickDelete, onClickReport }: Props) {
  const [reason, setReason] = useState('');

  return (
    <div tw="flex flex-col flex-1 min-h-0">
      <div tw="flex-1 overflow-auto">
        <div tw="px-5 pb-6">
          <div tw="mb-5 font-bold">매물등록 취소</div>
          <div tw="text-b2 text-gray-700 mb-5">
            네고시오에서 매물의 정보 및 제안받은 내역이 삭제되며, 중개사님의 중개 활동이 중단됩니다.
            <br />
            <br />
            우회 거래를 위한 매물등록 취소인 경우 네고시오 서비스 이용이 제한될 수 있습니다.
          </div>
          <Dropdown label="취소 사유" value={reason} onChange={setReason}>
            <Dropdown.Option value="매물재등록 준비">매물재등록 준비</Dropdown.Option>
            <Dropdown.Option value="다른 채널을 통해 매수(임차)인과 거래">
              다른 채널을 통해 매수(임차)인과 거래
            </Dropdown.Option>
            <Dropdown.Option value="서비스 불만족">서비스 불만족</Dropdown.Option>
            <Dropdown.Option value="거래의사 철회">거래의사 철회</Dropdown.Option>
          </Dropdown>
        </div>
        <Separator />
        <div tw="px-5 flex justify-between py-7">
          <div tw="text-b1 font-bold">
            혹시 중개사가 네고시오를 통하지 않고
            <br />
            거래하기를 요청했나요?
          </div>
          <Button size="small" variant="outlined" onClick={onClickReport}>
            신고하기
          </Button>
        </div>
      </div>
      <PersistentBottomBar>
        <Button disabled={!reason} tw="w-full" size="bigger" onClick={() => onClickDelete?.(reason)}>
          매물등록 취소하기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
