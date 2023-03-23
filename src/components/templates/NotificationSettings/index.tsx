import { NavigationHeader } from '@/components/molecules';

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
    </div>
  );
}
