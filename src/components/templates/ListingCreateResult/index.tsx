import { Loading, Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { AgentCardItem, ListingCreateResultStatus, ListingDetailSection } from '@/components/organisms';

import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';

import { ListingStatus } from '@/constants/enums';

import { MyListingDetailResponse } from '@/services/my/types';

export interface ListingCreateResultProps {
  isLoading: boolean;
  data?: MyListingDetailResponse;
  agents?: AgentCarouselItem[];
  onSelectAgent?: (index: number) => void;
  onClickBack?: () => void;
  onNavigateToChatRoom?: () => void;
}

export default function ListingCreateResult({
  isLoading,
  data,
  agents,
  onSelectAgent,
  onClickBack,
  onNavigateToChatRoom,
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
          {data?.listing_status === ListingStatus.WaitingForAgentCompletion && (
            <ListingCreateResultStatus.WaitingForAgentCompletion />
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
                  onNavigateToChatRoom={
                    data?.listing_status === ListingStatus.WaitingForAgentCompletion &&
                    data?.seller_agent_chat_room_id !== null
                      ? onNavigateToChatRoom
                      : undefined
                  }
                />
                <AgentCardItem.Detail
                  officePhone={data?.agent_summary?.office_phone}
                  fullJibunAddress={data?.agent_summary?.address}
                  registrationNumber={data?.agent_summary?.registration_number}
                  description={data?.agent_summary?.description}
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
    </div>
  );
}
