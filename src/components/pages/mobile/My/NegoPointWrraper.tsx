import { MobMyNegoPoint } from '@/components/templates';
import { useRouter } from 'next/router';

export default function NegoPointWrraper() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  return <MobMyNegoPoint onClickBack={handleClickBack} />;
}
