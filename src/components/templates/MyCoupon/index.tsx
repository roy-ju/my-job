import { NavigationHeader } from '@/components/molecules';
import NoData from './NoData';

export default function MyCoupon() {
  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>나의 쿠폰</NavigationHeader.Title>
      </NavigationHeader>
      <NoData />
    </div>
  );
}
