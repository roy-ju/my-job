import CommonSense from '@/components/domains/realestate-helper/CommonSense';

import MobAuthRequired from '@/components/atoms/MobAuthRequired';

import MobileContainer from '@/components/atoms/MobileContainer';

export default function CommonSenseMobile() {
  return (
    <MobAuthRequired>
      <MobileContainer>
        <CommonSense />
      </MobileContainer>
    </MobAuthRequired>
  );
}
