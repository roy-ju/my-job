import updateNotificationConfig from '@/apis/notification/updateNotificationConfig';
import { MobNotificationSettings } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import React, { ChangeEventHandler, useCallback } from 'react';

export default function NotificationSettingsWrraper() {
  const router = useRouter();

  const { user, mutate: mutateUser } = useAuth();

  const handleClickBackButton = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.NotificationList}`);
  }, [router]);

  const handleChangeService = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const { checked } = e.target;
      await updateNotificationConfig('service', checked);
      mutateUser();
    },
    [mutateUser],
  );

  const handleChangeChat = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const { checked } = e.target;
      await updateNotificationConfig('chat', checked);
      mutateUser();
    },
    [mutateUser],
  );

  const handleChangeMarketing = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const { checked } = e.target;
      await updateNotificationConfig('marketing', checked);
      mutateUser();
    },
    [mutateUser],
  );

  return (
    <MobNotificationSettings
      service={user?.serviceNotification ?? false}
      chat={user?.chatPushNotification ?? false}
      marketing={user?.marketingNotification ?? false}
      marketingAgreementDate={user?.marketingAgreementDate}
      marketingDisagreementDate={user?.marketingDisagreementDate}
      onClickBackButton={handleClickBackButton}
      onChangeService={handleChangeService}
      onChangeChat={handleChangeChat}
      onChangeMarketing={handleChangeMarketing}
    />
  );
}
