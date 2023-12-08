import { GetChatRoomListResponse } from '@/apis/chat/getChatRoomList';

import { KeyedMutator } from 'swr';

export type State = {
  data: GetChatRoomListResponse;
  isLoading: boolean;
  mutate: KeyedMutator<GetChatRoomListResponse>;
};
