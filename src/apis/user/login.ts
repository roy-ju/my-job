import axios from '@/lib/axios';

interface LoginRequest {
  browser?: string;
  device?: string;
  ipAddress?: string;
  socialLoginType: number;
  token: string;
  marketing?: boolean;
  nickname?: string;
  email?: string;
  signUpSource?: string;
}

export interface LoginResponse extends ErrorResponse {
  access_token: string;
  email: string;
  exp: number;
  name: string;
  new_registration: boolean;
  nickname: string;
  over_nineteen: boolean;
  phone: string;
  phone_verified: boolean;
  refresh_token: string;
}

export default async function login({
  browser,
  device,
  ipAddress,
  socialLoginType,
  token,
  email,
  nickname,
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
      marketing,
      signup_source: signUpSource,
    });
    return data as LoginResponse;
  } catch (e) {
    return null;
  }
}
