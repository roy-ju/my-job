import { StaticImageData } from 'next/image';

import { ChatRoomDetailResponse } from '@/services/chat/type';

import { ChatUserType } from '@/constants/enums';

export type WebSocketMessage = {
  message: string;
  read_chat_id: Nullable<number>;
  chat_id: number;
  chat_user_type: number;
};

export type ChatMessage = {
  id: number;
  chatUserType: ChatUserType;
  profileImagePath?: string | StaticImageData;
  name: string;
  message: string;
  sentTime: string;
  agentReadTime: Nullable<Date>;
  photoLoading?: boolean;
};

export type ChatMessages = ChatMessage[];

type RenderCondition = 'loading' | 'success' | 'error';

type Popups = 'photo_maximum_six' | 'close_chatroom' | 'send_photo' | '';

export type State = {
  data: Nullable<ChatRoomDetailResponse>;
  renderCondition: RenderCondition;
  photoSending: boolean;
  chatMessages: ChatMessages;
  photosUrls: string[];
  textFieldDisabled: boolean;
  popup: Popups;
};

export type Action =
  | { type: 'set_data'; payLoad: ChatRoomDetailResponse }
  | { type: 'set_render_condition'; payLoad: 'loading' | 'success' | 'error' }
  | { type: 'set_ChatMessages'; payLoad: ChatMessages }
  | { type: 'set_PhotosUrls'; payLoad: string[] }
  | { type: 'set_TextFieldDisabled'; payLoad: boolean }
  | { type: 'set_Popup'; payLoad: Popups }
  | { type: 'set_PhotoSending'; payLoad: boolean };
