import axios from '@/lib/axios';

interface Request {
  chat_room_id: number;
  message: string;
}

export default async function createReportChatRoom(req: Request) {
  try {
    const { data } = await axios.post('/listing/report/create', {
      ...req,
    });
    return data;
  } catch (e) {
    return null;
  }
}
