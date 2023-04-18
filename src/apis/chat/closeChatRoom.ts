import axios from '@/lib/axios';

export default async function closeChatRoom(chatRoomID: number) {
  try {
    const { data } = await axios.post('/chat/room/close', {
      chat_room_id: chatRoomID,
    });
    return data;
  } catch (e) {
    return null;
  }
}
