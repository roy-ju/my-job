import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import SelectUser from './SelectUser';

import useCtasHandler from './hooks/useCtasHandler';

import useHandleClickBack from './hooks/useHandleClickBack';

import useJwt from './hooks/useJwt';

const Etcs = dynamic(() => import('./Etcs'), { ssr: false });

const Column = styled.div`
  ${tw`flex flex-col gap-4 p-5`}
`;

export default function Developer() {
  const { renderBackButtonUi, handleClickBack } = useHandleClickBack();

  const { name, nickname, jwtOwners, jwtOwner, handleChangeJwtOwner } = useJwt();

  const { handleUpdateCurrentPosition, handleCopyToken } = useCtasHandler();

  return (
    <Container>
      <NavigationHeader>
        {renderBackButtonUi && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>개발자 설정</NavigationHeader.Title>
      </NavigationHeader>

      <Column>
        <SelectUser
          userName={name}
          userNickname={nickname}
          jwtOwners={jwtOwners}
          value={jwtOwner}
          handleChange={handleChangeJwtOwner}
        />
        <Etcs handleCopyToken={handleCopyToken} handleUpdateCurrentPosition={handleUpdateCurrentPosition} />
      </Column>
    </Container>
  );
}
