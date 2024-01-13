import updateNotificationConfig from '@/apis/notification/updateNotificationConfig';
import { MobileContainer } from '@/components/atoms';
import { NotificationSettings as NotificationSettingsTemplate } from '@/components/templates';
import useAuth from '@/hooks/services/useAuth';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

export default function NotificationSettingsWrraper() {
  const router = useRouter();
  const { user } = useAuth();
  const [serviceNotification, setServiceNotification] = useState<boolean | undefined>(false);
  const [chatPushNotification, setChatPushNotification] = useState<boolean | undefined>(false);
  const [marketingNotification, setMarketingNotification] = useState<boolean | undefined>(false);

  useEffect(() => {
    setServiceNotification(user?.serviceNotification);
    setChatPushNotification(user?.chatPushNotification);
    setMarketingNotification(user?.marketingNotification);
  }, [user]);

  const handleClickBackButton = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
  }, [router]);

  const handleChangeService = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const { checked } = e.target;
    await updateNotificationConfig('service', checked);
    setServiceNotification(checked);
  }, []);

  const handleChangeChat = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const { checked } = e.target;
    await updateNotificationConfig('chat', checked);
    setChatPushNotification(checked);
  }, []);

  const handleChangeMarketing = useCallback<ChangeEventHandler<HTMLInputElement>>(async (e) => {
    const { checked } = e.target;
    await updateNotificationConfig('marketing', checked);
    setMarketingNotification(checked);
  }, []);

  return (
    <MobileContainer>
      <NotificationSettingsTemplate
        service={serviceNotification ?? false}
        chat={chatPushNotification ?? false}
        marketing={marketingNotification ?? false}
        marketingAgreementDate={user?.marketingAgreementDate}
        marketingDisagreementDate={user?.marketingDisagreementDate}
        onClickBackButton={handleClickBackButton}
        onChangeService={handleChangeService}
        onChangeChat={handleChangeChat}
        onChangeMarketing={handleChangeMarketing}
      />
    </MobileContainer>
  );
}
