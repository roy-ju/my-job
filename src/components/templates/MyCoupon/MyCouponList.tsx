import MyCouponListItem from '@/components/organisms/MyCouponListItem';
import { v4 as uuidv4 } from 'uuid';

export interface MyCouponListProps {}

export default function MyCouponList() {
  return (
    <div tw="px-5 flex flex-col gap-3 ">
      {[false, false, true, true, false].map((v) => (
        <MyCouponListItem key={uuidv4()} isExpired={v} />
      ))}
    </div>
  );
}
