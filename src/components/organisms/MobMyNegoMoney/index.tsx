import { Button, Numeral } from '@/components/atoms';

export interface MyNegoMoneyProps {
  totalMoney?: number;
}

export default function MobMyNegoMoney({ totalMoney = 0 }: MyNegoMoneyProps) {
  return (
    <div tw="pt-6 pb-9 px-5 bg-white">
      <div tw="text-b1 leading-none font-bold mb-3">보유 포인트</div>
      <div tw="mb-3.5">
        <Numeral tw="text-h1 text-nego-1000 font-bold leading-[30px]">{totalMoney}</Numeral>
        <span tw="text-h3 leading-none text-nego-1000 font-bold pl-1">P</span>
      </div>
      <div tw="mb-1 text-b2 leading-5">
        <span tw="text-gray-700">총 획득 포인트</span>
        <span tw="pl-1 text-nego-1000" />
      </div>
      <div tw="mb-5 text-b2 leading-5">
        <span tw="text-gray-700">사용된 포인트</span>
        <span tw="pl-1 text-nego-1000" />
      </div>
      <Button disabled variant="outlined" tw="w-full mb-4">
        네고머니로 전환하기
      </Button>
      <div tw="text-info text-gray-700">
        네고포인트는 이후에 네고머니로 전환하거나 서비스 내에서 서비스 구매를 위해 사용할 수 있습니다.
      </div>
    </div>
  );
}
