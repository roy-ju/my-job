import { NavigationHeader } from '@/components/molecules';
import NoData from './NoData';
import MyCouponList from './MyCouponList';

export default function MyCoupon({ hasData }: { hasData: boolean }) {
  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>나의 쿠폰</NavigationHeader.Title>
      </NavigationHeader>
      {hasData ? <MyCouponList /> : <NoData />}
    </div>
  );
}
