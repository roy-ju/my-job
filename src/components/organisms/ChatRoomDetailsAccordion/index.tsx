import { ReactNode, useMemo } from 'react';
import {
  IChatRoomDetailBiddingItem,
  IChatRoomDetailListingItem,
  IChatRoomDetailSuggestRecommendItem,
  IChatRoomDetailSuggestItem,
} from '@/apis/chat/getChatRoomDetail';
import ChatRoomDetailsAccordionContext from './ChatRoomDetailsAccordionContext';
import SellerAgentListingRegister from './SellerAgentListingRegister';
import SellerBuyerSuggestRecommendation from './SellerBuyerSuggestRecommendation';
import BuyerSellerSuggestRecommendation from './BuyerSellerSuggestRecommendation';
import BuyerAgentSuggestRecommendation from './BuyerAgentSuggestRecommendation';
import BuyerAgentBidding from './BuyerAgentBidding';

interface Props {
  children?: ReactNode;
  listingItem?: IChatRoomDetailListingItem;
  biddingItem?: IChatRoomDetailBiddingItem;
  suggestItem?: IChatRoomDetailSuggestItem;
  suggestRecommendItem?: IChatRoomDetailSuggestRecommendItem;
  onClickContractCtaButton?: () => void;
  onClickNavigateToListingDetail?: (listingID: number) => () => void;
  onClickNavigateToListingCreateResult?: (listingID: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingID: number, biddingID: number) => () => void;
}

function Container({
  children,
  listingItem,
  biddingItem,
  suggestItem,
  suggestRecommendItem,
  onClickContractCtaButton,
  onClickNavigateToListingDetail,
  onClickNavigateToListingCreateResult,
  onClickNavigateToListingDetailHistory,
}: Props) {
  const context = useMemo(
    () => ({
      listingItem,
      biddingItem,
      suggestItem,
      suggestRecommendItem,
      onClickContractCtaButton,
      onClickNavigateToListingDetail,
      onClickNavigateToListingCreateResult,
      onClickNavigateToListingDetailHistory,
    }),
    [
      listingItem,
      biddingItem,
      suggestItem,
      suggestRecommendItem,
      onClickContractCtaButton,
      onClickNavigateToListingDetail,
      onClickNavigateToListingCreateResult,
      onClickNavigateToListingDetailHistory,
    ],
  );

  return (
    <ChatRoomDetailsAccordionContext.Provider value={context}>{children}</ChatRoomDetailsAccordionContext.Provider>
  );
}

export default Object.assign(Container, {
  SellerAgentListingRegister,
  SellerBuyerSuggestRecommendation,
  BuyerSellerSuggestRecommendation,
  BuyerAgentSuggestRecommendation,
  BuyerAgentBidding,
});
