import { ChangeEventHandler } from 'react';

import tw, { styled } from 'twin.macro';

import { Button, Loading } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import Form from './detail/Form';

interface MyDetailProps {
  nickname: string;
  email: string;
  name: string;
  phone: string;
  profileImageUrl: string;
  updateNicknameButtonDisabled: boolean;
  isLoading: boolean;
  onClickDeregister: () => void;
  onClickLogout: () => void;
  onClickUpdatePhone: () => void;
  onClickUpdateNickname: () => void;
  onClickUpdateEmail: () => void;
  onClickUpdateProfileImage: (file: File) => void;
  onChangeNickname: ChangeEventHandler<HTMLInputElement>;
  onClickVerifyCi?: () => void;
  onClickBack?: () => void;
}

const Container = styled.div`
  ${tw`flex flex-col h-full`}
`;

const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 overflow-y-auto`}
`;

export default function MyDetail({
  nickname,
  email,
  name,
  phone,
  profileImageUrl,
  updateNicknameButtonDisabled,
  isLoading,
  onClickDeregister,
  onClickLogout,
  onClickUpdatePhone,
  onClickUpdateNickname,
  onClickUpdateEmail,
  onClickUpdateProfileImage,
  onChangeNickname,
  onClickVerifyCi,
  onClickBack,
}: MyDetailProps) {
  return (
    <Container>
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-b1">회원정보</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        {isLoading ? (
          <Loading tw="mt-10" />
        ) : (
          <Form tw="pt-6 pb-10">
            <Form.LoginInfo
              nickname={nickname}
              email={email}
              updateNicknameButtonDisabled={updateNicknameButtonDisabled}
              onClickLogout={onClickLogout}
              onClickUpdateNickname={onClickUpdateNickname}
              onClickUpdateEmail={onClickUpdateEmail}
              onChangeNickname={onChangeNickname}
            />

            <Form.Separator />

            <Form.IdentityInfo
              name={name}
              phone={phone}
              onClickUpdate={onClickUpdatePhone}
              onClickVerifyCi={onClickVerifyCi}
            />
            <Form.Separator />

            <Form.ProfileImage profileImageUrl={profileImageUrl} onClickUpdate={onClickUpdateProfileImage} />

            <Form.Separator />
            <div tw="px-5 mt-10">
              <Button variant="outlined" tw="w-full" size="medium" onClick={onClickDeregister}>
                회원 탈퇴
              </Button>
            </div>
          </Form>
        )}
      </FlexContents>
    </Container>
  );
}
