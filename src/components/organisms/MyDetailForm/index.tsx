import { Button } from '@/components/atoms';
import { TextField } from '@/components/molecules';

interface UpdatetableTextFieldProps {
  label: string;
  value?: string;
  disabled?: boolean;
}

function UpdatableTextField({ label, value, disabled = false }: UpdatetableTextFieldProps) {
  return (
    <TextField variant="outlined">
      <TextField.Input value={value} label={label} disabled={disabled} />
      <TextField.Trailing>
        <Button size="small" variant="gray">
          변경
        </Button>
      </TextField.Trailing>
    </TextField>
  );
}

function LoginInfo() {
  return (
    <div>
      <div tw="flex items-center justify-between mb-4">
        <div tw="text-b1 leading-4 font-bold">로그인 정보</div>
        <Button variant="ghost" size="none" tw="text-info leading-4 underline">
          로그아웃
        </Button>
      </div>
      <div tw="flex flex-col gap-3">
        <UpdatableTextField label="닉네임" />
        <UpdatableTextField label="간편 로그인" />
      </div>
    </div>
  );
}

function IdentityInfo() {
  return (
    <div>
      <div tw="flex items-center justify-between mb-4">
        <div tw="text-b1 leading-4 font-bold">본인인증 정보</div>
      </div>
      <div tw="flex flex-col gap-3">
        <UpdatableTextField label="실명" disabled />
        <UpdatableTextField label="휴대폰 번호" />
      </div>
    </div>
  );
}

function AddressInfo() {
  return null;
}

function PrivacyRetentionInfo() {
  return null;
}

function Container() {
  return null;
}

export default Object.assign(Container, { LoginInfo, IdentityInfo, AddressInfo, PrivacyRetentionInfo });
