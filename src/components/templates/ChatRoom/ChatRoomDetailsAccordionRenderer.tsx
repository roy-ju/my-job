import React from 'react';
import { ChatRoomType, ChatUserType } from '@/constants/enums';
import { ChatRoomDetailsAccordion } from '@/components/organisms';
import {
  IChatRoomDetailBiddingItem,
  IChatRoomDetailListingItem,
  IChatRoomDetailSuggestRecommendItem,
  IChatRoomDetailSuggestItem,
} from '@/apis/chat/getChatRoomDetail';

interface Props {
  chatUserType: ChatUserType;
  chatRoomType: ChatRoomType;
  listingItem?: IChatRoomDetailListingItem;
  biddingItem?: IChatRoomDetailBiddingItem;
  suggestItem?: IChatRoomDetailSuggestItem;
  suggestRecommendItem?: IChatRoomDetailSuggestRecommendItem;
  onClickContractCtaButton?: () => void;
  onClickNavigateToListingDetail?: (listingID: number) => () => void;
  onClickNavigateToListingCreateResult?: (listingID: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingID: number, biddingID: number) => () => void;
}

export default function ChatRoomDetailsAccordionRenderer({
  chatUserType,
  chatRoomType,
  listingItem,
  biddingItem,
  suggestItem,
  suggestRecommendItem,
  onClickContractCtaButton,
  onClickNavigateToListingDetail,
  onClickNavigateToListingCreateResult,
  onClickNavigateToListingDetailHistory,
}: Props) {
  let contents = null;

  if (chatUserType === ChatUserType.Seller) {
    switch (chatRoomType) {
      case ChatRoomType.SellerAgentListingRegister:
        contents = <ChatRoomDetailsAccordion.SellerAgentListingRegister />;
        break;
      case ChatRoomType.BuyerSellerSuggestRecommendation:
        contents = <ChatRoomDetailsAccordion.SellerBuyerSuggestRecommendation />;
        break;
      default:
        return null;
    }
  }
  if (chatUserType === ChatUserType.Buyer) {
    switch (chatRoomType) {
      case ChatRoomType.BuyerAgentBidding:
        contents = <ChatRoomDetailsAccordion.BuyerAgentBidding />;
        break;
      case ChatRoomType.BuyerSellerSuggestRecommendation:
        contents = <ChatRoomDetailsAccordion.BuyerSellerSuggestRecommendation />;
        break;
      case ChatRoomType.BuyerAgentSuggestRecommendation:
        contents = <ChatRoomDetailsAccordion.BuyerAgentSuggestRecommendation />;
        break;
      default:
        return null;
    }
  }

  return (
    <ChatRoomDetailsAccordion
      listingItem={listingItem}
      biddingItem={biddingItem}
      suggestItem={suggestItem}
      suggestRecommendItem={suggestRecommendItem}
      onClickContractCtaButton={onClickContractCtaButton}
      onClickNavigateToListingDetail={onClickNavigateToListingDetail}
      onClickNavigateToListingCreateResult={onClickNavigateToListingCreateResult}
      onClickNavigateToListingDetailHistory={onClickNavigateToListingDetailHistory}
    >
      {contents}
    </ChatRoomDetailsAccordion>
  );
}
