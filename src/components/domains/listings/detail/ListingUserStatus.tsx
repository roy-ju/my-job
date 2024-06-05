import { SetStateAction, Dispatch } from 'react';

import tw, { styled } from 'twin.macro';

import { Separator } from '@/components/atoms';

import { Accordion } from '@/components/molecules';

import { ListingCtaButtons } from '@/components/organisms';

import { ListingDetailResponse } from '@/services/listing/types';

import UserStatusStrings from './constants/userStatusStrings';

type ListingUserStatusProps = {
  listingDetail?: ListingDetailResponse | null;
  setUserStatusAccordion: Dispatch<SetStateAction<HTMLDivElement | null>>;

  onNavigateToParticipateBidding?: () => void;
  onNavigateToUpdateBidding?: () => void;
  onNavigateToChatRoom?: () => void;
  onNavigateToSuggestForm?: () => void;
  onNavigateToUpdateTargetPrice?: () => void;
  onNavigateToListingDetailHistory?: () => void;
  onClickSuggestNotInterested?: () => void;
  onClickSuggestAcceptRecommend?: () => void;
};

const Title = styled.h2`
  ${tw`text-left`}
`;

const StyledSperator = styled(Separator)`
  ${tw`w-full [min-height: 8px]`}
`;

const Wrraper = styled.div`
  ${tw`mt-5`}
`;

export default function ListingUserStatus({
  listingDetail,
  setUserStatusAccordion,
  onNavigateToParticipateBidding,
  onNavigateToUpdateBidding,
  onNavigateToChatRoom,
  onNavigateToSuggestForm,
  onNavigateToUpdateTargetPrice,
  onNavigateToListingDetailHistory,
  onClickSuggestNotInterested,
  onClickSuggestAcceptRecommend,
}: ListingUserStatusProps) {
  return (
    <>
      {Object.keys(UserStatusStrings).includes(`${listingDetail?.visit_user_type}`) && (
        <div>
          <StyledSperator />

          <Accordion defaultExpanded>
            <Accordion.Summary tw="h-14 px-5 font-bold">
              <Title>{UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.title}</Title>
            </Accordion.Summary>

            <Accordion.Details tw="pt-1 pb-6 px-5 text-b2 text-gray-700 whitespace-pre-wrap">
              <p>{UserStatusStrings[listingDetail?.visit_user_type ?? 0]?.body}</p>

              {listingDetail?.bidding_reject_reason && (
                <Wrraper>
                  <span tw="text-nego-1000">중개사님 추가답변</span>
                  <br />
                  {listingDetail?.bidding_reject_reason}
                </Wrraper>
              )}

              <Wrraper ref={setUserStatusAccordion}>
                <ListingCtaButtons
                  visitUserType={listingDetail?.visit_user_type ?? 0}
                  buttonSize="big"
                  onNavigateToParticipateBidding={onNavigateToParticipateBidding}
                  onNavigateToUpdateBidding={onNavigateToUpdateBidding}
                  onNavigateToUpdateTargetPrice={onNavigateToUpdateTargetPrice}
                  onNavigateToChatRoom={onNavigateToChatRoom}
                  onClickSuggestAcceptRecommend={onClickSuggestAcceptRecommend}
                  onClickSuggestNotInterested={onClickSuggestNotInterested}
                  onNavigateToSuggestForm={onNavigateToSuggestForm}
                  onNavigateToListingDetailHistory={onNavigateToListingDetailHistory}
                />
              </Wrraper>
            </Accordion.Details>
          </Accordion>
        </div>
      )}
    </>
  );
}
