import { Button } from '@/components/atoms';
import { TextField } from '@/components/molecules';

export interface UpdatePhoneProps {
  // phone?: string;
  // code?: string;
  sent?: boolean;
}

export default function UpdatePhone({ sent = false }: UpdatePhoneProps) {
  return (
    <div tw="p-5">
      <div tw="text-h2 font-bold mb-6">
        중요 알림을 받으실
        <br />
        휴대폰번호를 입력해 주세요.
      </div>
      <div tw="flex flex-col gap-3">
        <TextField variant="outlined">
          <TextField.Input label="휴대폰번호" />
          <TextField.Trailing>
            <Button size="small">{sent ? '재발송' : '발송'}</Button>
          </TextField.Trailing>
        </TextField>
        <TextField variant="outlined">
          <TextField.Input label="인증번호" />
          <TextField.Trailing>
            <Button size="small">확인</Button>
          </TextField.Trailing>
        </TextField>
      </div>
    </div>
  );
}
