import { Button, Numeral } from '@/components/atoms';
import NoData from '@/components/templates/MobMyNegoMoney/Nodata';

export interface MyNegoMoneyProps {
  totalMoney?: number;
}

export default function MobMyNegoMoney({ totalMoney = 0 }: MyNegoMoneyProps) {
  return (
    <>
      <div tw="pt-6 pb-9 px-5 bg-white">
        <div tw="text-b1 leading-none font-bold mb-3">나의 네고머니</div>
        <div tw="mb-3.5">
          <Numeral tw="text-h1 text-nego-1000 font-bold leading-[30px]">{totalMoney}</Numeral>
          <span tw="text-h1 [line-height: 1] leading-none text-nego-1000 font-bold pl-0">원</span>
        </div>
        <div tw="flex gap-2 mb-1 text-b2 leading-5">
          <Button disabled variant="outlined" tw="w-full mb-4">
            인출
          </Button>
          <Button variant="secondary" tw="w-full mb-4">
            충전
          </Button>
        </div>
      </div>
      <div tw="h-3 bg-gray-100 shrink-0" />
      <div tw="mt-[2.5rem] px-5">
        <span tw="text-b1 font-bold [line-height: 1] text-gray-1000 ">지난 내역</span>
        <NoData />
      </div>
    </>
  );
}
