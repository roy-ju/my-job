import axios from '@/lib/axios';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category_group_code, x, y, radius, page } = req.query;

    if (!category_group_code) {
      return res.status(400).json({ error: 'group_code is required' });
    }

    if (!x || !y) {
      return res.status(400).json({ error: 'x and y is required' });
    }

    if (!radius) {
      return res.status(400).json({ error: 'radius is required' });
    }

    if (!page) {
      return res.status(400).json({ error: 'page is required' });
    }

    const accessKEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!accessKEY) {
      return res.status(500).json({ error: 'Missing NEXT_PUBLIC_KAKAO_REST_API_KEY' });
    }

    const headers = {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
    };

    try {
      const { data } = await axios.get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${category_group_code}&x=${x}&y=${y}&radius=${radius}&page=${page}`,
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
