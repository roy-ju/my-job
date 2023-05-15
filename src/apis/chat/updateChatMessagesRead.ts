import axios from '@/lib/axios';

export async function updateChatMessagesRead(chatRoomID: number) {
  try {
    return await axios.post('/chat/messages/read', { chat_room_id: chatRoomID });
  } catch (e) {
    return null;
  }
}
