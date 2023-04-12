import { Button, Loading } from '@/components/atoms';
import { MobGlobalHeader, MyDetailForm } from '@/components/organisms';
import { ChangeEventHandler } from 'react';

interface MyDetailProps {
  nickname: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
  addressVerified: boolean;
  updateNicknameButtonDisabled: boolean;
  isLoading: boolean;
  privacyRetentionType: string;
  onClickDeregister: () => void;
  onClickLogout: () => void;
  onClickUpdateAddress: () => void;
  onClickUpdatePhone: () => void;
  onClickUpdateNickname: () => void;
  onClickUpdateEmail: () => void;
  onChangeNickname: ChangeEventHandler<HTMLInputElement>;
  onClickVerifyCi?: () => void;
  onClickUpdatePrivacyRetentionType: (value: string) => void;
}

export default function MobMyDetail({
  nickname,
  email,
  name,
  phone,
  address,
  addressDetail,
  addressVerified,
  updateNicknameButtonDisabled,
  isLoading,
  privacyRetentionType,
  onClickDeregister,
  onClickLogout,
  onClickUpdateAddress,
  onClickUpdatePhone,
  onClickUpdateNickname,
  onClickUpdateEmail,
  onChangeNickname,
  onClickVerifyCi,
  onClickUpdatePrivacyRetentionType,
}: MyDetailProps) {
  return (
    <>
      <div tw="w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
        <MobGlobalHeader title="회원정보" />
        <div tw="flex-1 min-h-0 overflow-y-auto mt-[3.5rem]">
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
              <MyDetailForm.AddressInfo
                address={address}
                addressDetail={addressDetail}
                verified={addressVerified}
                onClickUpdateAddress={onClickUpdateAddress}
              />
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
