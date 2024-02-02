import tw, { styled } from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import Contents from './re-activate/Contents';

import Ctas from './re-activate/Ctas';

import useMyReActivate from './re-activate/hooks/useMyReActivate';

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 w-full`}
`;

export default function MyReactivate() {
  const { email, inactive_time, social_login_type, handleClickBack, handleVerifyPhone } = useMyReActivate();

  return (
    <div tw="w-full h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>휴면계정 해제</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <Contents email={email} inactive_time={inactive_time} social_login_type={social_login_type} />
      </FlexContents>
      <Ctas handleClick={handleVerifyPhone} />
    </div>
  );
}
