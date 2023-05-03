import path from 'path';

import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import { parse } from 'csv-parse';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  return new Promise((resolve) => {
    const dir = path.join(process.cwd(), 'src/assets/contents/faq_v2.csv');

    const data: {
      [category: string]: {
        q: string;
        a: string;
      }[];
    } = {};

    fs.createReadStream(dir)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row: string[]) => {
        if (row.length === 4) {
          data[row[1]] = [
            ...(data[row[1]] ?? []),
            {
              q: row[2],
              a: row[3],
            },
          ];
        }
      })
      .on('error', () => {
        res.status(500).json([]);
        resolve(null);
      })
      .on('end', () => {
        res.status(200).json(data);
        resolve(null);
      });
  });
}
