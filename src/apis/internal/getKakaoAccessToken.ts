import axios from 'axios';

interface GetKakaoAccessTokenRequest {
  code: string;
  redirectUri: string;
}

interface GetKakaoAccessTokenResponse {
  accessToken: string;
  refreshToken: string;
  scope: string;
}

export default async function getKakaoAccessToken({ code, redirectUri }: GetKakaoAccessTokenRequest) {
  try {
    const { data } = await axios.post('/api/auth/kakao/getToken', { code, redirectUri });
    return data as GetKakaoAccessTokenResponse;
  } catch (e) {
    return null;
  }
}
