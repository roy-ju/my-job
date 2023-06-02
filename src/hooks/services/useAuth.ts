import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { deleteFcmToken, updateFcmToken } from '@/apis/user/updateFcmToken';
import Keys from '@/constants/storage_keys';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export default function useAuth() {
  const {
    data,
    isLoading,
    mutate: mutateUserInfo,
  } = useAPI_GetUserInfo({ revalidateIfStale: false, revalidateOnFocus: false });

  const user = useMemo(
    () =>
      data
        ? {
            id: data.ID,
            name: data.name,
            nickname: data.nickname,
            email: data.email,
            phone: data.phone,
            serviceNotification: data.service_notification,
            chatPushNotification: data.chat_push_notification,
            marketingNotification: !data.marketing_disagreement_date,
            marketingAgreementDate: data.marketing_agreement_date,
            marketingDisagreementDate: data.marketing_disagreement_date,
            privacyRetentionType: data.privacy_retention_type,
            isVerified: data.is_verified,
            hasAddress: data.has_address,
          }
        : null,
    [data],
  );

  const mutateUser = useCallback(
    (clearCache = true) => {
      if (clearCache) {
        return mutate(() => true, undefined);
      }
      return mutateUserInfo();
    },
    [mutateUserInfo],
  );

  const logout = useCallback(async () => {
    const fcmToken = localStorage.getItem(Keys.FCM_TOKEN);
    if (fcmToken) {
      await deleteFcmToken({ token: fcmToken });
    }

    localStorage.removeItem(Keys.ACCESS_TOKEN);
    localStorage.removeItem(Keys.REFRESH_TOKEN);

    mutate(() => true, undefined);
  }, []);

  const login = useCallback(async (accessToken: string, refreshToken: string) => {
    localStorage.setItem(Keys.ACCESS_TOKEN, JSON.stringify(accessToken));
    localStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(refreshToken));

    const fcmToken = localStorage.getItem(Keys.FCM_TOKEN);
    const deviceId = localStorage.getItem(Keys.DEVICE_ID);

    if (fcmToken && deviceId) {
      updateFcmToken({
        token: fcmToken,
        device_id: deviceId,
      });
    }

    return mutate(() => true, undefined);
  }, []);

  return useMemo(
    () => ({ user, isLoading, mutate: mutateUser, logout, login }),
    [user, mutateUser, isLoading, logout, login],
  );
}
