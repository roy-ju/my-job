import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import { ChangeEventHandler } from 'react';

export interface UpdatePhoneProps {
  phone?: string;
  code?: string;
  sent?: boolean;
  codeVerified?: boolean;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;
  onChangeCode?: ChangeEventHandler<HTMLInputElement>;
  onClickSend?: () => void;
  onClickVerifyCode?: () => void;
  onClickNext?: () => void;
}

export default function UpdatePhone({
  sent = false,
  phone,
  code,
  codeVerified = false,
  onChangePhone,
  onChangeCode,
  onClickNext,
  onClickSend,
  onClickVerifyCode,
}: UpdatePhoneProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader />
      <div tw="p-5 flex-1 min-h-0">
        <div tw="text-h2 font-bold mb-6">
          중요 알림을 받으실
          <br />
          휴대폰번호를 입력해 주세요.
        </div>
        <div tw="flex flex-col gap-3">
          <TextField variant="outlined">
            <TextField.Input label="휴대폰번호" value={phone} onChange={onChangePhone} />
            <TextField.Trailing>
              <Button size="small" onClick={onClickSend}>
                {sent ? '재발송' : '발송'}
              </Button>
            </TextField.Trailing>
          </TextField>
          {sent && (
            <TextField variant="outlined">
              <TextField.Input label="인증번호" value={code} onChange={onChangeCode} />
              <TextField.Trailing>
                <Button size="small" onClick={onClickVerifyCode}>
                  확인
                </Button>
              </TextField.Trailing>
            </TextField>
          )}
        </div>
      </div>
      <PersistentBottomBar>
        <Button disabled={!codeVerified} size="bigger" variant="secondary" tw="w-full" onClick={onClickNext}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
