import axios from '@/lib/axios';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { x, y } = req.query;

    if (!x || !y) {
      return res.status(400).json({ error: 'x and y is required' });
    }

    const accessKEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!accessKEY) {
      return res.status(500).json({ error: 'Missing NEXT_PUBLIC_KAKAO_REST_API_KEY' });
    }

    const headers = {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    };

    try {
      const params = new URLSearchParams({
        x: `${x}`,
        y: `${y}`,
      });

      const { data } = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?`, {
        params,
        headers,
      });

      res.status(200).json(data);

      return data;
    } catch (e) {
      const err = e as any;
      const status = err.response.status ? err.response.status : 500;

      res.status(status).json({
        ...err?.response?.data,
      });
    }
  }
}
