import { Button, Loading, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardItem, ListingCreateResultStatus } from '@/components/organisms';
import { ListingStatus } from '@/constants/enums';

export interface ListingCreateResultProps {
  isLoading: boolean;

  agentOfficeName?: string;
  agentProfileImageFullPath?: string;
  agentName?: string;
  agentCellPhone?: string;
  agentJibunAddress?: string;
  agentRegistrationNumber?: string;
  agentDescription?: string;

  listingStatus?: number;

  addressLine1?: string;
  addressLine2?: string;

  buyOrRent?: number;
  rentArea?: string;

  onClickMyListings?: () => void;
  onClickUpdateAddress?: () => void;
  onClickStartOver?: () => void;
}

export default function ListingCreateResult({
  isLoading,
  agentOfficeName,
  agentProfileImageFullPath = '',
  agentName,
  agentCellPhone,
  agentJibunAddress,
  agentDescription,
  agentRegistrationNumber,
  listingStatus,
  addressLine1,
  addressLine2,
  buyOrRent,
  rentArea,
  onClickMyListings,
  onClickUpdateAddress,
  onClickStartOver,
}: ListingCreateResultProps) {
  if (isLoading) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청 결과</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="pt-6 pb-10 px-5">
          {listingStatus === ListingStatus.VerifyAddress && <ListingCreateResultStatus.VerifyingAddress />}
          {listingStatus === ListingStatus.WaitingForAgentCompletion && (
            <ListingCreateResultStatus.WaitingForAgentCompletion />
          )}
          {listingStatus === ListingStatus.NoAddressFound && (
            <ListingCreateResultStatus.NoAddressFound
              addressLine1={addressLine1 ?? ''}
              addressLine2={addressLine2 ?? ''}
              onClickStartOver={onClickStartOver}
              onClickUpdateAddress={onClickUpdateAddress}
            />
          )}
          {listingStatus === ListingStatus.Duplicated && (
            <ListingCreateResultStatus.Duplicated
              addressLine1={addressLine1 ?? ''}
              addressLine2={addressLine2 ?? ''}
              buyOrRent={buyOrRent ?? 0}
              rentArea={rentArea}
            />
          )}
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
        <div tw="px-5 pb-10">
          <Button size="bigger" tw="w-full" onClick={onClickMyListings}>
            나의 거래 목록
          </Button>
        </div>
      </div>
    </div>
  );
}
