import { GetChatRoomDetailResponse } from '@/apis/chat/getChatRoomDetail';

export type State = {
  data?: GetChatRoomDetailResponse;
  isLoading: boolean;
};
