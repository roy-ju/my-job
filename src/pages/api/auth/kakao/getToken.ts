import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  // Prevent methods other than POST.
  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const { code, redirectUri } = body;
  const clientID = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  if (!clientID) {
    res.status(500).end('Missing NEXT_PUBLIC_KAKAO_REST_API_KEY');
    return;
  }

  if (!code || !redirectUri) {
    res.status(400).end('Required fields in the request body are missing.');
    return;
  }

  const requestBody = {
    grant_type: 'authorization_code',
    client_id: clientID,
    redirect_uri: redirectUri,
    code,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };

  const requestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const { data } = await axios.post('https://kauth.kakao.com/oauth/token', requestBody, { headers: requestHeaders });

    res.status(200).json({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      scope: data.scope,
    });
  } catch (e) {
    const err = e as any;
    res.status(500).json({
      ...err?.response?.data,
    });
  }
}
