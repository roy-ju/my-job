import { MobileContainer } from '@/components/atoms';
import MobGlobalNavigation from '@/components/organisms/MobGlobalNavigation';
import MobMapHeader from '@/components/organisms/MobMapHeader';
import MobMapLayout from '@/layouts/Mobile/MapLayout';

export default function Map() {
  return (
    <MobileContainer>
      <MobMapHeader value={10} />
      <MobMapLayout />
      <MobGlobalNavigation />
    </MobileContainer>
  );
}
