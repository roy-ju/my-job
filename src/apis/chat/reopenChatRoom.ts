import axios from '@/lib/axios';

export default async function reopneChatRoom(chatRoomID: number) {
  try {
    const { data } = await axios.post('/chat/room/reopen', {
      chat_room_id: chatRoomID,
    });
    return data;
  } catch (e) {
    return null;
  }
}
