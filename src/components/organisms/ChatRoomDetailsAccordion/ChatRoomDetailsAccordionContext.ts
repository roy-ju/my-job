import { createContext } from 'react';
import {
  IChatRoomDetailBiddingItem,
  IChatRoomDetailListingItem,
  IChatRoomDetailSuggestRecommendItem,
  IChatRoomDetailSuggestItem,
} from '@/apis/chat/getChatRoomDetail';

interface IChatRoomDetailsAccordionContext {
  listingItem?: IChatRoomDetailListingItem;
  biddingItem?: IChatRoomDetailBiddingItem;
  suggestItem?: IChatRoomDetailSuggestItem;
  suggestRecommendItem?: IChatRoomDetailSuggestRecommendItem;
  onClickContractCtaButton?: () => void;
  onClickNavigateToListingDetail?: (listingID: number) => () => void;
  onClickNavigateToListingCreateResult?: (listingID: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingID: number, biddingID: number) => () => void;
}

const ChatRoomDetailsAccordionContext = createContext<Partial<IChatRoomDetailsAccordionContext>>({});

export default ChatRoomDetailsAccordionContext;
