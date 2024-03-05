export type ChatRoomListItem = {
  id: number;
  chatRoomType: number;
  profileImagePath: string;
  name: string;
  unreadMessageCount: number;
  lastMessage: string;
  lastMessageTime: string;
  active: boolean;
};
