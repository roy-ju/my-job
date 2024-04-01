import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useHandleClickBack from './settings/hooks/useHandleClickBack';

import useNotificationSettings from './settings/hooks/useNotificationSettings';

import Form from './settings/Form';

export default function NotificationSettings() {
  const {
    marketingAgreementDate,
    marketingDisagreementDate,
    serviceNotification,
    marketingNotification,
    chatPushNotification,
    handleChangeService,
    handleChangeChat,
    handleChangeMarketing,
  } = useNotificationSettings();

  const { handleClickBack } = useHandleClickBack();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title tw="text-b1">알림 설정</NavigationHeader.Title>
      </NavigationHeader>

      <Form>
        <Form.Service checked={serviceNotification} onChange={handleChangeService} />
        <Form.Chat checked={chatPushNotification} onChange={handleChangeChat} />
        <Form.Marketing
          checked={marketingNotification}
          onChange={handleChangeMarketing}
          agreementDate={marketingAgreementDate}
          disagreementDate={marketingDisagreementDate}
        />
      </Form>
    </Container>
  );
}
