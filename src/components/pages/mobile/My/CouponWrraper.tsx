import { MobMyCoupon } from '@/components/templates';
import { useRouter } from 'next/router';

export default function CouponWrraper() {
  const router = useRouter();
  const handleClickBackButton = () => {
    router.back();
  };

  return <MobMyCoupon hasData={false} onClickBack={handleClickBackButton} />;
}
