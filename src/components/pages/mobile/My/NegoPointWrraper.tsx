import { MobileContainer } from '@/components/atoms';
import { NegoPoint } from '@/components/templates';
import { useRouter } from 'next/router';

export default function NegoPointWrraper() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };

  return (
    <MobileContainer>
      <NegoPoint onClickBack={handleClickBack} />
    </MobileContainer>
  );
}
