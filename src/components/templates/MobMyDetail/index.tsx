import { ChangeEventHandler } from 'react';

import { useRouter } from 'next/router';

import { Button, Loading } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { MyDetailForm } from '@/components/organisms';

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
}

export default function MobMyDetail({
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
}: MyDetailProps) {
  const router = useRouter();

  return (
    <>
      <div tw="w-full mx-auto h-full flex flex-col bg-white">
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={() => router.back()} />
          <NavigationHeader.Title>회원정보</NavigationHeader.Title>
        </NavigationHeader>
        <div tw="flex-1 min-h-0 overflow-auto">
          {isLoading ? (
            <Loading tw="mt-10" />
          ) : (
            <MyDetailForm tw="pt-6 pb-10">
              <MyDetailForm.LoginInfo
                nickname={nickname}
                email={email}
                updateNicknameButtonDisabled={updateNicknameButtonDisabled}
                onClickLogout={onClickLogout}
                onClickUpdateNickname={onClickUpdateNickname}
                onClickUpdateEmail={onClickUpdateEmail}
                onChangeNickname={onChangeNickname}
              />
              <MyDetailForm.Separator />
              <MyDetailForm.IdentityInfo
                name={name}
                phone={phone}
                onClickUpdate={onClickUpdatePhone}
                onClickVerifyCi={onClickVerifyCi}
              />
              <MyDetailForm.Separator />
              <MyDetailForm.ProfileImage profileImageUrl={profileImageUrl} onClickUpdate={onClickUpdateProfileImage} />
              <MyDetailForm.Separator />
              <div tw="px-5 mt-10">
                <Button variant="outlined" tw="w-full" size="medium" onClick={onClickDeregister}>
                  회원 탈퇴
                </Button>
              </div>
            </MyDetailForm>
          )}
        </div>
      </div>
    </>
  );
}
