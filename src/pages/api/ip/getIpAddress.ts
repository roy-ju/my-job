import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.status(200).json({ ipAddress });
}
