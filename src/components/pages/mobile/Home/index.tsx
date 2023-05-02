import { MobileContainer } from '@/components/atoms';
import { MobGlobalNavigation } from '@/components/organisms';

export default function Home() {
  return <MobileContainer bottomNav={<MobGlobalNavigation index={0} />} />;
}
