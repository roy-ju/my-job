import { MobileContainer } from '@/components/atoms';
import { MyCoupon } from '@/components/templates';

import { useRouter } from 'next/router';

export default function CouponWrraper() {
  const router = useRouter();

  return (
    <MobileContainer>
      <MyCoupon hasData={false} onClickBack={() => router.back()} />
    </MobileContainer>
  );
}
