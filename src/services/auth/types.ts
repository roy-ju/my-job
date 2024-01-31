export type LoginRequest = {
  browser?: string;
  device?: string;
  ipAddress?: string;
  socialLoginType: number;
  token: string;
  marketing?: boolean;
  nickname?: string;
  email?: string;
  signUpSource?: string;
};

export interface LoginCiRequest {
  encData: string;
  integrityValue: string;
  kie: string;
  tokenVersionId: string;
  type: number;
}

export type LoginResponse = {
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

  fields?: {
    email?: string;
    inactive_time?: Date;
  };
} & ErrorResponse;

export type UserInfoResponse = {
  ID: number;
  email: string;
  is_verified: boolean;
  nickname: string;
  profile_image_url: string;
  over_nineteen: boolean;
  social_login_type: number;
  status: number;
  name: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  phone_carrier: string;
  bank_name: string;
  bank_code: string;
  bank_account_number: string;
  push_notification: boolean;
  chat_push_notification: boolean;
  night_push_notification: boolean;
  info_talk_notification: boolean;
  service_notification: boolean;
  suspend_types?: any;
  privacy_retention_type: number;
  marketing_agreement_date: string | null;
  marketing_disagreement_date: string | null;
  nego_money: number;
  nego_point: number;
  has_pin: boolean;
  has_address: boolean;
  has_not_verified_address: boolean;
  pin_locked: boolean;
  phone_verification_done: boolean;
  withdraw_account_exists: boolean;
  inactivae_time?: any;
  deleted_time?: any;
  created_time: Date;
};

export type UpdateCIResponse = {
  coupon_created: boolean;
} & ErrorResponse;

export type LoginCiResponse = {
  access_token: string;
  email: string;
  exp: number;
  reactivated: boolean;
  refresh_token: string;
  social_login_type: number;
} & ErrorResponse;
