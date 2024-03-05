import { ChatRoomDetailResponse } from '@/services/chat/type';

export type State = {
  data?: ChatRoomDetailResponse;
  isLoading: boolean;
};
