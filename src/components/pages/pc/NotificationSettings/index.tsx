import updateNotificationConfig from '@/apis/notification/updateNotificationConfig';
import { Panel } from '@/components/atoms';
import { NotificationSettings as NotificationSettingsTemplate } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { ChangeEventHandler, memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { user, mutate: mutateUser } = useAuth();

  const handleClickBackButton = useCallback(() => {
    router.replace(Routes.NotificationList);
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
    <Panel width={panelWidth}>
      <NotificationSettingsTemplate
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
    </Panel>
  );
});
