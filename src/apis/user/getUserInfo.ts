import useSWR from 'swr';

import authFetcher from '@/lib/swr/authFetcher';

export interface GetUserInfoResponse {
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
}

export default function useAPI_GetUserInfo(options?: { revalidateIfStale?: boolean; revalidateOnFocus?: boolean }) {
  const { data, isLoading, mutate } = useSWR<GetUserInfoResponse>('/user/info/get', authFetcher, {
    ...options,
  });

  return {
    data,
    isLoading,
    mutate,
  };
}
