import axios from 'axios';

interface KakaoAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
  scope: string;
}

export default async function getKakaoAccessToken({ code, redirectUri }: { code: string; redirectUri: string }) {
  try {
    const { data } = await axios.post('/api/auth/kakao/getToken', { code, redirectUri });
    return data as KakaoAccessTokenResponse;
  } catch (e) {
    return null;
  }
}
