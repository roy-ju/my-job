/* eslint-disable no-continue */

/* eslint-disable no-restricted-syntax */

/* eslint-disable no-await-in-loop */

import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

import cheerio from 'cheerio';

type NewsMetaDataList = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { query, display, start, sort } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'query is required' });
    }

    const accessID = process.env.NEXT_PUBLIC_NCP_CLIENT_SEARCH_ID;

    const accessPASSWORD = process.env.NEXT_PUBLIC_NCP_CLIENT_SEARCH_PASSWORD;

    if (!accessID || !accessPASSWORD) {
      return res
        .status(500)
        .json({ error: 'Missing NEXT_PUBLIC_NCP_CLIENT_SEARCH_ID or NEXT_PUBLIC_NCP_CLIENT_SEARCH_PASSWORD' });
    }

    const headers = {
      'X-Naver-Client-Id': process.env.NEXT_PUBLIC_NCP_CLIENT_SEARCH_ID,
      'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_NCP_CLIENT_SEARCH_PASSWORD,
    };

    try {
      const { data } = await axios.get(`https://openapi.naver.com/v1/search/news.json`, {
        params: { query, display, start, sort },
        headers,
      });

      const { items } = data;

      if (items && items?.length > 0) {
        try {
          const newsMetaDataList = [];

          for (const { link, originallink, title, description, pubDate } of items) {
            try {
              const response = await axios.get(link, { headers: { 'User-agent': 'request' } });

              const html = response?.data;

              const $ = cheerio.load(html);

              const ogImageUrl = $('meta[property="og:image"]').attr('content');

              const convertedNewsData = {
                title,
                description,
                imageUrl: ogImageUrl || '',
                originallink,
                link,
                pubDate,
              };

              newsMetaDataList.push(convertedNewsData);
            } catch (e) {
              //
            }
          }

          res.status(200).json(newsMetaDataList as NewsMetaDataList[]);
        } catch (error) {
          const e = error as any;
          const status = e.response.status ? e.response.status : 500;
          res.status(status).json({
            ...e?.response?.data,
          });
        }
      }
    } catch (e) {
      const err = e as any;
      const status = err.response.status ? err.response.status : 500;

      res.status(status).json({
        ...err?.response?.data,
      });
    }
  }
}
