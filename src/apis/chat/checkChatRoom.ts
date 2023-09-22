import axios from '@/lib/axios';

export default async function checkChatRoom(chatRoomID: number) {
  try {
    const { data } = await axios.post('/chat/room/close/check', {
      chat_room_id: chatRoomID,
    });
    return data;
  } catch (e) {
    return null;
  }
}
