import { NavigationHeader } from '@/components/molecules';

import tw, { styled } from 'twin.macro';

import Contents from './find-account/Contents';

import Ctas from './find-account/Ctas';

import useMyFindAccount from './find-account/hooks/useMyFindAccount';

import ImageContents from './find-account/ImageContents';

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 w-full`}
`;

export default function MyFindAccount() {
  const { handleClickBack, handleVerifyPhone } = useMyFindAccount();

  return (
    <div tw="h-full flex flex-col w-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>계정정보 찾기</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <Contents />
        <ImageContents />
      </FlexContents>
      <Ctas handleClick={handleVerifyPhone} />
    </div>
  );
}
