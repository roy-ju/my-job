import { NavigationHeader } from '@/components/molecules';
import { NotificationSettingsForm } from '@/components/organisms';

interface Props {
  onClickBackButton?: () => void;
}

export default function NotificationSettings({ onClickBackButton }: Props) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title tw="text-b1">알림 설정</NavigationHeader.Title>
      </NavigationHeader>
      <NotificationSettingsForm>
        <NotificationSettingsForm.Service />
        <NotificationSettingsForm.Chat />
        <NotificationSettingsForm.Marketing />
      </NotificationSettingsForm>
    </div>
  );
}
