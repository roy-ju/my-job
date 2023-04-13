import { Ul } from '@/components/atoms';

export default function WaitingForAgentCompletion() {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">매물등록 준비 중입니다.</div>
      <Ul tw="mt-2">
        <li>신청하신 매물을 담당 중개사가 확인하고 있어요.</li>
      </Ul>
    </div>
  );
}
