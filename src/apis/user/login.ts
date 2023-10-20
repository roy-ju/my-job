import axios from '@/lib/axios';

interface LoginRequest {
  browser?: string;
  device?: string;
  ipAddress?: string;
  socialLoginType: number;
  token: string;
  privacyRetentionType?: number;
  marketing?: boolean;
  nickname?: string;
  email?: string;
  signUpSource?: string;
}

export interface LoginResponse extends ErrorResponse {
  new_registration: boolean;
  phone_verified: boolean;
  over_nineteen: boolean;
  kakao_nickname: any;
  kakao_nickname_duplicated: boolean;
  nickname: string;
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
  exp: number;
  
}

export default async function login({
  browser,
  device,
  ipAddress,
  socialLoginType,
  token,
  email,
  nickname,
  privacyRetentionType,
  marketing,
  signUpSource,
}: LoginRequest) {
  try {
    const { data } = await axios.post('/user/login/sns', {
      browser,
      ip_address: ipAddress,
      device,
      social_login_type: socialLoginType,
      token,

      // for new registration
      email,
      nickname,
      privacy_retention_type: privacyRetentionType,
      marketing,
      signup_source: signUpSource,
    });
    return data as LoginResponse;
  } catch (e) {
    return null;
  }
}
