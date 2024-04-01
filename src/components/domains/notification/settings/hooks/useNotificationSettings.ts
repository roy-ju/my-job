import { ChangeEventHandler, useState, useEffect, useCallback } from 'react';

import useAuth from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import useCheckPlatform from '@/hooks/useCheckPlatform';

export default function useNotificationSettings() {
  const { platform } = useCheckPlatform();

  const { user, mutate: mutateUser } = useAuth();

  const [serviceNotification, setServiceNotification] = useState<boolean | undefined>(false);
  const [chatPushNotification, setChatPushNotification] = useState<boolean | undefined>(false);
  const [marketingNotification, setMarketingNotification] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (!user) return;

    if (user) {
      setServiceNotification(user.serviceNotification);
      setChatPushNotification(user.chatPushNotification);
      setMarketingNotification(user.marketingNotification);
    }
  }, [user]);

  const handleChangeService = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const { checked } = e.target;
    await apiService.updateNotificationConfig('service', checked);
    setServiceNotification(checked);
  }, []);

  const handleChangeChat = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const { checked } = e.target;
    await apiService.updateNotificationConfig('chat', checked);
    setChatPushNotification(checked);
  }, []);

  const handleChangeMarketing = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const { checked } = e.target;
      await apiService.updateNotificationConfig('marketing', checked);
      if (platform === 'pc') {
        await mutateUser(false);
      }
      setMarketingNotification(checked);
    },
    [mutateUser, platform],
  );

  return {
    marketingAgreementDate: user?.marketingAgreementDate,
    marketingDisagreementDate: user?.marketingDisagreementDate,
    serviceNotification,
    marketingNotification,
    chatPushNotification,
    handleChangeService,
    handleChangeChat,
    handleChangeMarketing,
  };
}
