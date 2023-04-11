import { NavigationHeader } from '@/components/molecules';
import { NotificationSettingsForm } from '@/components/organisms';
import { ChangeEventHandler } from 'react';

interface Props {
  service?: boolean;
  chat?: boolean;
  marketing?: boolean;
  marketingAgreementDate?: string | null;
  marketingDisagreementDate?: string | null;
  onClickBackButton?: () => void;
  onChangeService?: ChangeEventHandler<HTMLInputElement>;
  onChangeChat?: ChangeEventHandler<HTMLInputElement>;
  onChangeMarketing?: ChangeEventHandler<HTMLInputElement>;
}

export default function MobNotificationSettings({
  service,
  chat,
  marketing,
  marketingAgreementDate,
  marketingDisagreementDate,
  onChangeService,
  onChangeChat,
  onChangeMarketing,
  onClickBackButton,
}: Props) {
  return (
    <div tw="fixed top-0 left-0 right-0 w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title tw="text-b1">알림 설정</NavigationHeader.Title>
      </NavigationHeader>
      <NotificationSettingsForm>
        <NotificationSettingsForm.Service checked={service} onChange={onChangeService} />
        <NotificationSettingsForm.Chat checked={chat} onChange={onChangeChat} />
        <NotificationSettingsForm.Marketing
          checked={marketing}
          onChange={onChangeMarketing}
          agreementDate={marketingAgreementDate}
          disagreementDate={marketingDisagreementDate}
        />
      </NotificationSettingsForm>
    </div>
  );
}
