import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { MyDetailForm } from '@/components/organisms';

interface MyDetailProps {
  nickname: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  addressDetail: string;
  addressVerified: boolean;
  onClickDeregister: () => void;
  onClickLogout: () => void;
  onClickUpdateAddress: () => void;
}

export default function MyDetail({
  nickname,
  email,
  name,
  phone,
  address,
  addressDetail,
  addressVerified,
  onClickDeregister,
  onClickLogout,
  onClickUpdateAddress,
}: MyDetailProps) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title tw="text-b1">회원정보</NavigationHeader.Title>
      </NavigationHeader>
      <MyDetailForm tw="pt-6 pb-10">
        <MyDetailForm.LoginInfo nickname={nickname} email={email} onClickLogout={onClickLogout} />
        <MyDetailForm.Separator />
        <MyDetailForm.IdentityInfo name={name} phone={phone} />
        <MyDetailForm.Separator />
        <MyDetailForm.AddressInfo
          address={address}
          addressDetail={addressDetail}
          verified={addressVerified}
          onClickUpdateAddress={onClickUpdateAddress}
        />
        <MyDetailForm.Separator />
        <MyDetailForm.PrivacyRetentionInfo />
        <div tw="px-5 mt-10">
          <Button variant="outlined" tw="w-full" size="medium" onClick={onClickDeregister}>
            회원 탈퇴
          </Button>
        </div>
      </MyDetailForm>
    </div>
  );
}
