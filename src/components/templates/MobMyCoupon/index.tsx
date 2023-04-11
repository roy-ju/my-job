import { NavigationHeader } from '@/components/molecules';
import NoData from './NoData';
import MyCouponList from './MyCouponList';

export default function MobMyCoupon({ hasData, onClickBack }: { hasData: boolean; onClickBack?: () => void }) {
  return (
    <div tw="w-full max-w-mobile left-0 right-0 flex flex-col h-full mx-auto bg-white fixed">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>나의 쿠폰</NavigationHeader.Title>
      </NavigationHeader>
      {hasData ? <MyCouponList /> : <NoData />}
    </div>
  );
}
