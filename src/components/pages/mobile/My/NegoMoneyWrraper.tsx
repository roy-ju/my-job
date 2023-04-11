import { MobMyNegoMoney } from '@/components/templates';
import { useRouter } from 'next/router';

export default function NegomoneyWrraper() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  return <MobMyNegoMoney onClickBack={handleClickBack} />;
}
