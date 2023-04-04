// import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { MyNegoPoint } from '@/components/organisms';

export interface NegoPointProps {
  totalPoint?: number;
  earnedPoint?: number;
  usedPoint?: number;
}

export default function NegoPoint({ totalPoint, earnedPoint, usedPoint }: NegoPointProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>네고포인트</NavigationHeader.Title>
        {/* <Button variant="ghost" size="none" tw="underline text-info">
          네고포인트 안내
        </Button> */}
      </NavigationHeader>
      <div tw="flex-1 flex flex-col min-h-0">
        <MyNegoPoint totalPoint={totalPoint} earnedPoint={earnedPoint} usedPoint={usedPoint} />
      </div>
    </div>
  );
}
