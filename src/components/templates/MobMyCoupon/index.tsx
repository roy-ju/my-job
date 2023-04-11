import { NavigationHeader } from '@/components/molecules';
import NoData from './NoData';
import MyCouponList from './MyCouponList';

export default function MobMyCoupon({ hasData, onClickBack }: { hasData: boolean; onClickBack?: () => void }) {
  return (
    <div tw="w-full max-w-mobile relative flex flex-col h-full mx-auto bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>나의 쿠폰</NavigationHeader.Title>
      </NavigationHeader>
      {hasData ? <MyCouponList /> : <NoData />}
    </div>
  );
}
