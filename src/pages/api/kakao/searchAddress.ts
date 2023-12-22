import axios from '@/lib/axios';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'query is required' });
    }

    const accessKEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!accessKEY) {
      return res.status(500).json({ error: 'Missing NEXT_PUBLIC_KAKAO_REST_API_KEY' });
    }

    const headers = {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    };

    if (typeof query === 'string') {
      try {
        const { data } = await axios.get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&analyze_type=similar`,
          {
            headers,
          },
        );

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
}
