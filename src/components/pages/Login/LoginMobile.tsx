import Login from '@/components/domains/auth/Login';

import MobileContainer from '@/components/atoms/MobileContainer';

interface Props {
  ipAddress?: string;
}

export default function LoginMobile({ ipAddress }: Props) {
  return (
    <MobileContainer>
      <Login ipAddress={ipAddress} />
    </MobileContainer>
  );
}
