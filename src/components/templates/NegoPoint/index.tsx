import { NavigationHeader } from '@/components/molecules';
import { MyNegoPoint } from '@/components/organisms';

export interface NegoPointProps {
  totalPoint?: number;
  earnedPoint?: number;
  usedPoint?: number;
  onClickBack?: () => void;
}

export default function NegoPoint({ totalPoint, earnedPoint, usedPoint, onClickBack }: NegoPointProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>네고포인트</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 flex flex-col min-h-0">
        <MyNegoPoint totalPoint={totalPoint} earnedPoint={earnedPoint} usedPoint={usedPoint} />
      </div>
    </div>
  );
}
