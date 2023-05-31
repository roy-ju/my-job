import { NavigationHeader } from '@/components/molecules';
import { MyNegoPoint } from '@/components/organisms';

export interface MobMyNegoPointProps {
  totalPoint?: number;
  earnedPoint?: number;
  usedPoint?: number;
  onClickBack?: () => void;
}

export default function MobMyNegoPoint({ totalPoint, earnedPoint, usedPoint, onClickBack }: MobMyNegoPointProps) {
  return (
    <div tw="w-full max-w-mobile flex flex-col h-full mx-auto bg-white fixed left-0 right-0">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>네고포인트</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 flex flex-col min-h-0">
        <MyNegoPoint totalPoint={totalPoint} earnedPoint={earnedPoint} usedPoint={usedPoint} />
      </div>
    </div>
  );
}
