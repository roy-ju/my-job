import { Button, Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { MyDetailForm } from '@/components/organisms';
import { useRouter } from 'next/router';
import { ChangeEventHandler } from 'react';

interface MyDetailProps {
  nickname: string;
  email: string;
  name: string;
  phone: string;
  profileImageUrl: string;
  updateNicknameButtonDisabled: boolean;
  isLoading: boolean;
  privacyRetentionType: string;
  onClickDeregister: () => void;
  onClickLogout: () => void;
  onClickUpdatePhone: () => void;
  onClickUpdateNickname: () => void;
  onClickUpdateEmail: () => void;
  onClickUpdateProfileImage: (file: File) => void;
  onChangeNickname: ChangeEventHandler<HTMLInputElement>;
  onClickVerifyCi?: () => void;
  onClickUpdatePrivacyRetentionType: (value: string) => void;
}

export default function MobMyDetail({
  nickname,
  email,
  name,
  phone,
  profileImageUrl,
  updateNicknameButtonDisabled,
  isLoading,
  privacyRetentionType,
  onClickDeregister,
  onClickLogout,
  onClickUpdatePhone,
  onClickUpdateNickname,
  onClickUpdateEmail,
  onClickUpdateProfileImage,
  onChangeNickname,
  onClickVerifyCi,
  onClickUpdatePrivacyRetentionType,
}: MyDetailProps) {
  const router = useRouter();

  return (
    <>
      <div tw="w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
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
              <MyDetailForm.PrivacyRetentionInfo
                value={privacyRetentionType}
                onChange={onClickUpdatePrivacyRetentionType}
              />
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
