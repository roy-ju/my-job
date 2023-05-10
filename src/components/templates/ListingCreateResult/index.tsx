import { GetMyListingDetailResponse } from '@/apis/listing/getMyListingDetail';
import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardItem, ListingCreateResultStatus, ListingDetailSection } from '@/components/organisms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';
import { AddressListItem } from '@/components/organisms/ListingCreateResultStatus/MultipleAddressesFound';
import { ListingStatus } from '@/constants/enums';

export interface ListingCreateResultProps {
  isLoading: boolean;

  data?: GetMyListingDetailResponse;

  addressList?: AddressListItem[];
  agents?: AgentCarouselItem[];

  isSendingSms?: boolean;

  ownerName?: string;
  ownerPhone?: string;

  onClickMyListings?: () => void;
  onClickUpdateAddress?: () => void;
  onSelectAddress?: (realestateUniqueNumber: string) => void;
  onSelectAgent?: (index: number) => void;
  onClickStartOver?: () => void;
  onClickRemoveFromListings?: () => void;
  onClickSendOwnerVerification?: (name: string, phone: string) => void;
  onClickBack?: () => void;
}

export default function ListingCreateResult({
  isLoading,

  data,

  addressList,
  agents,
  isSendingSms,

  ownerName,
  ownerPhone,

  onClickMyListings,
  onClickUpdateAddress,
  onSelectAddress,
  onSelectAgent,
  onClickStartOver,
  onClickRemoveFromListings,
  onClickSendOwnerVerification,
  onClickBack,
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
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물등록 신청 결과</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 pb-10 min-h-0 overflow-y-auto overflow-x-hidden">
        <div tw="pt-6 pb-10">
          {data?.listing_status === ListingStatus.VerifyOwnershipNotFound && (
            <ListingCreateResultStatus.VerifyOwnershipNotFound
              isLoading={isSendingSms}
              onClickSend={onClickSendOwnerVerification}
            />
          )}
          {data?.listing_status === ListingStatus.WaitingForOwnerAgreement && (
            <ListingCreateResultStatus.WaitingForOwnerAgreement
              ownerName={ownerName}
              ownerPhone={ownerPhone}
              isLoading={isSendingSms}
              onClickSend={onClickSendOwnerVerification}
            />
          )}
          {(data?.listing_status === ListingStatus.VerifyAddress ||
            data?.listing_status === ListingStatus.VerifyOwnership) && <ListingCreateResultStatus.VerifyingAddress />}
          {data?.listing_status === ListingStatus.WaitingForAgentCompletion && (
            <ListingCreateResultStatus.WaitingForAgentCompletion />
          )}
          {data?.listing_status === ListingStatus.NoAddressFound && (
            <ListingCreateResultStatus.NoAddressFound
              addressLine1={data?.listing?.road_name_address ?? data?.listing?.jibun_address ?? ''}
              addressLine2={data?.full_road_name_address?.replace(data?.listing?.road_name_address ?? '', '')}
              onClickStartOver={onClickStartOver}
              onClickUpdateAddress={onClickUpdateAddress}
            />
          )}
          {data?.listing_status === ListingStatus.Duplicated && (
            <ListingCreateResultStatus.Duplicated
              addressLine1={data?.listing?.road_name_address ?? data?.listing?.jibun_address ?? ''}
              addressLine2={data?.full_road_name_address?.replace(data?.listing?.road_name_address ?? '', '')}
              buyOrRent={data?.listing?.buy_or_rent ?? 0}
              rentArea={data?.listing?.rent_area}
            />
          )}
          {data?.listing_status === ListingStatus.MultipleAddressesFound && (
            <ListingCreateResultStatus.MultipleAddressesFound
              addressLine1={data?.listing?.road_name_address ?? data?.listing?.jibun_address ?? ''}
              addressLine2={data?.full_road_name_address?.replace(data?.listing?.road_name_address ?? '', '')}
              addressList={addressList}
              onClickItem={onSelectAddress}
            />
          )}
          {data?.listing_status === ListingStatus.AgentSelection && agents && (
            <ListingCreateResultStatus.AgentSelection agents={agents} onClickNext={onSelectAgent} />
          )}
        </div>
        <Separator />
        {data?.agent_summary?.name && (
          <div tw="py-10 px-5">
            <div tw="text-b1 font-bold mb-4">중개사 정보</div>
            <div tw="rounded-xl bg-gray-100">
              <AgentCardItem defaultExpanded>
                <AgentCardItem.Profile
                  officeName={data?.agent_summary?.office_name ?? ''}
                  profileImageFullPath={data?.agent_summary?.profile_image_full_path}
                  name={data?.agent_summary?.name}
                />
                <AgentCardItem.Detail
                  cellPhone={data?.agent_summary?.cell_phone}
                  fullJibunAddress={data?.agent_summary?.address}
                  registrationNumber={data?.agent_summary?.registration_number}
                />
                <AgentCardItem.FoldButton />
              </AgentCardItem>
            </div>
          </div>
        )}
        <Separator />
        <div tw="px-5 pt-10">
          <ListingDetailSection.Conditions
            listing={data?.listing}
            debtSuccessions={data?.debt_successions ?? []}
            collaterals={data?.collaterals ?? []}
          />
        </div>
      </div>
      <PersistentBottomBar>
        {data?.listing_status !== ListingStatus.Duplicated ? (
          <Button size="bigger" tw="w-full" onClick={onClickMyListings}>
            나의 거래 목록
          </Button>
        ) : (
          <Button size="bigger" tw="w-full" onClick={onClickRemoveFromListings}>
            목록에서 삭제
          </Button>
        )}
      </PersistentBottomBar>
    </div>
  );
}
