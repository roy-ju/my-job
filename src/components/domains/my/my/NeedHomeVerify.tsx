import { Button } from '@/components/atoms';

import NeedIcon from '@/assets/icons/need.svg';

export default function NeedHomeVerify({ onClickCTA }: { onClickCTA?: () => void }) {
  return (
    <div tw="flex flex-col items-center gap-4">
      <NeedIcon />
      <div tw="flex flex-col gap-1">
        <p tw="text-h2 font-bold text-center">집주인 인증이 필요해요</p>
        <p tw="text-b2 text-gray-700 text-center">
          집주인 인증하고, 우리집을 거래해보세요!
          <br />
          공동소유의 집이나 대리인 인증도 가능해요.
        </p>
      </div>
      <Button variant="primary" size="medium" onClick={onClickCTA}>
        집주인 인증하기
      </Button>
    </div>
  );
}
