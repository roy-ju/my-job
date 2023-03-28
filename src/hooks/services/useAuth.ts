import useAPI_GetUserInfo from '@/apis/user/getUserInfo';
import { useCallback, useMemo } from 'react';
import { mutate } from 'swr';

export default function useAuth() {
  const {
    data,
    isLoading,
    mutate: mutateBase,
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
          }
        : null,
    [data],
  );

  const mutateUser = useCallback(
    (clearCache = false) => {
      if (clearCache) {
        mutate(() => true, undefined, false);
      }
      mutateBase();
    },
    [mutateBase],
  );

  return useMemo(() => ({ user, isLoading, mutate: mutateUser }), [user, mutateUser, isLoading]);
}
