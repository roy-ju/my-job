import { MobileContainer } from '@/components/atoms';
import { FAQ as FAQTemplate } from '@/components/templates';
import { useRouter } from 'next/router';

export default function FaqWrraper() {
  const router = useRouter();

  return (
    <MobileContainer>
      <FAQTemplate onClickBack={() => router.back()} />
    </MobileContainer>
  );
}
