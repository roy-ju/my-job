import { Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardItem } from '@/components/organisms';

export interface ListingCreateSummaryProps {
  agentOfficeName: string;
  agentProfileImageFullPath: string;
  agentName: string;
  agentCellPhone: string;
  agentJibunAddress: string;
  agentRegistrationNumber: string;
  agentDescription: string;
}

export default function ListingCreateSummary({
  agentOfficeName,
  agentProfileImageFullPath,
  agentName,
  agentCellPhone,
  agentJibunAddress,
  agentRegistrationNumber,
  agentDescription,
}: ListingCreateSummaryProps) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청 최종 확인</NavigationHeader.Title>
      </NavigationHeader>
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
    </div>
  );
}
