import { Button, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardItem, TransactionCondition } from '@/components/organisms';
import { BuyOrRentString } from '@/constants/strings';

export interface ListingCreateSummaryProps {
  agentOfficeName: string;
  agentProfileImageFullPath: string;
  agentName: string;
  agentCellPhone: string;
  agentJibunAddress: string;
  agentRegistrationNumber: string;
  agentDescription: string;

  buyOrRent?: number;
  tradePrice?: number;
  deposit?: number;
  monthlyRentFee?: number;
  contractAmount?: number;
  remainingAmount?: number;
  interimAmount1?: number;
  interimAmount2?: number;
  interimAmount3?: number;
  debtSuccessions?: { name: string; amount: number }[];
  collaterals?: { name: string; amount: number }[];
  moveInDate?: string;
  moveInDateType?: string; // dateType = 1 : 이전,  2: 이후
  rentTermYear?: number;
  rentTermMonth?: number;
  rentArea?: string;
  specialTerms?: string;
}

export default function ListingCreateSummary({
  agentOfficeName,
  agentProfileImageFullPath,
  agentName,
  agentCellPhone,
  agentJibunAddress,
  agentRegistrationNumber,
  agentDescription,

  buyOrRent,
}: // price,
// monthlyRentFee,
// contractAmount,
// remainingAmount,
// interimAmount1,
// interimAmount2,
// interimAmount3,
// debtSuccessions,
// collaterals,
// moveInDate,
// moveInDateType,
// rentTermYear,
// rentTermMonth,
// rentArea,
// specialTerms,
ListingCreateSummaryProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청 최종 확인</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="pt-6 pb-10 px-5">
          <div tw="text-h2 font-bold mb-1">매물등록 신청 준비가 끝났습니다.</div>
          <div tw="text-info text-gray-700">아래 내용을 확인하시고, 매물등록 신청 버튼을 누르면 완료됩니다.</div>
        </div>
        <Separator />
        <div tw="py-10 px-5">
          <div tw="text-b1 font-bold mb-4">중개사 정보</div>
          <div tw="rounded-xl bg-gray-100">
            <AgentCardItem defaultExpanded>
              <AgentCardItem.Profile
                officeName={agentOfficeName}
                profileImageFullPath={agentProfileImageFullPath}
                name={agentName}
              />
              <AgentCardItem.Detail
                cellPhone={agentCellPhone}
                fullJibunAddress={agentJibunAddress}
                registrationNumber={agentRegistrationNumber}
                description={agentDescription}
              />
              <AgentCardItem.FoldButton />
            </AgentCardItem>
          </div>
        </div>
        <Separator />
        <div tw="px-5">
          <div tw="mt-10 mb-4 text-b1 font-bold leading-none">거래조건</div>
          <TransactionCondition>
            <TransactionCondition.List>
              {buyOrRent && <TransactionCondition.Item label="거래종류" value={BuyOrRentString[buyOrRent]} />}
              <TransactionCondition.Item label="희망가" value="3억 1,000만/100만" />
              <TransactionCondition.Section title="지급일정" hasToolTip>
                <TransactionCondition.Item label="계약금" value={1} />
                <TransactionCondition.Item label="중도금" value={1} />
                <TransactionCondition.Item label="잔금" value={1} />
                <TransactionCondition.Item label="실제지급총액" value={1} />
              </TransactionCondition.Section>
              <TransactionCondition.Section title="선순위 담보권" hasToolTip>
                <TransactionCondition.Item label="선순위담보권" value={{ name: 'Jay', amount: 1 }} />
              </TransactionCondition.Section>
              <TransactionCondition.Section title="세부정보">
                <TransactionCondition.Item label="입주가능시기" value="2022.03.03 이전" />
                <TransactionCondition.Item label="전세자금대출" value={false} />
                <TransactionCondition.Item label="임대기간" value={2} />
                <TransactionCondition.Item label="임대할부분" value="전체" />
              </TransactionCondition.Section>
              <TransactionCondition.Item label="특약조건" value="특약조건으로 무엇이 들어갈 수 있을까나 아아" />
            </TransactionCondition.List>
          </TransactionCondition>
        </div>
        <div tw="py-10 flex items-center justify-center">
          <Button variant="ghost" size="none" tw="underline text-info">
            입력정보 수정/중개사 재선택
          </Button>
        </div>
        <div tw="px-5 pb-10">
          <Button size="bigger" tw="w-full">
            매물등록 신청
          </Button>
        </div>
      </div>
    </div>
  );
}
