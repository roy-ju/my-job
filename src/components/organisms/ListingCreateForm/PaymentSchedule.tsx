import { Button } from '@/components/atoms';

interface Props {
  onClickAddInterim?: () => void;
  showCalculator?: boolean;
}

export default function PaymentSchedule({ onClickAddInterim, showCalculator = true }: Props) {
  return (
    <div tw="flex flex-col gap-6">
      <div tw="flex justify-between">
        <div tw="text-b1 leading-none font-bold">희망 지급일정</div>
        <Button size="small" variant="outlined" onClick={onClickAddInterim}>
          중도금 추가
        </Button>
      </div>
      {showCalculator && (
        <div tw="flex flex-col gap-2">
          <div tw="p-5 bg-gray-200 rounded-lg">
            <div tw="text-b1 leading-none font-bold mb-5">네고시오 계산도우미</div>
            <div tw="flex flex-col gap-3">
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4">희망가</div>
                <div tw="text-b2 leading-4">99억 9,999만 / 9,999만</div>
              </div>
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4">채무승계금액</div>
                <div tw="text-b2 leading-4">- 99억 9,999만 / 9,999만</div>
              </div>
              <div tw="flex justify-between">
                <div tw="text-b2 leading-4 font-bold text-nego-1000">실제 지급 총액</div>
                <div tw="text-b2 leading-4 font-bold text-nego-1000">= 99억 9,999만 / 9,999만</div>
              </div>
            </div>
          </div>
          <div tw="text-end text-info text-gray-700">계약금의 최소금액은 99억 9,999만 원입니다.</div>
        </div>
      )}
    </div>
  );
}
