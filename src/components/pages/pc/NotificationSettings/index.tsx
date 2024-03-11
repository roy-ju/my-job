import { Panel } from '@/components/atoms';
import { NotificationSettings as NotificationSettingsTemplate } from '@/components/templates';
import useAuth from '@/hooks/services/useAuth';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { apiService } from '@/services';
import { ChangeEventHandler, memo, useCallback, useEffect, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const { user, mutate: mutateUser } = useAuth();

  const [serviceNotification, setServiceNotification] = useState<boolean | undefined>(false);
  const [chatPushNotification, setChatPushNotification] = useState<boolean | undefined>(false);
  const [marketingNotification, setMarketingNotification] = useState<boolean | undefined>(false);

  useEffect(() => {
    setServiceNotification(user?.serviceNotification);
    setChatPushNotification(user?.chatPushNotification);
    setMarketingNotification(user?.marketingNotification);
  }, [user]);

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.NotificationList);
  }, [router]);

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
      await mutateUser(false);
      setMarketingNotification(checked);
    },
    [mutateUser],
  );

  return (
    <Panel width={panelWidth}>
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
    </Panel>
  );
});
