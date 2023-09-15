import axios from '@/lib/axios';

interface Request {
  source: string;
  route: string;
  message: string;
}

export default async function logError(req: Request) {
  try {
    const { data } = await axios.post('/dev/errorlog', {
      source: req.source,
      route: req.route,
      message: req.message,
    });
    return data;
  } catch (e) {
    return null;
  }
}
