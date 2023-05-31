import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader, TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, useCallback } from 'react';

export interface UpdatePhoneProps {
  phone?: string;
  code?: string;
  sent?: boolean;
  codeVerified?: boolean;
  codeErrorMessage?: string;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;
  onChangeCode?: ChangeEventHandler<HTMLInputElement>;
  onClickSend?: () => void;
  onClickVerifyCode?: () => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function MobUpdatePhone({
  sent = false,
  phone: phoneProp,
  code: codeProp,
  codeVerified = false,
  codeErrorMessage,
  onChangePhone,
  onChangeCode,
  onClickNext,
  onClickSend,
  onClickVerifyCode,
  onClickBack,
}: UpdatePhoneProps) {
  const [phone, setPhone] = useControlled({
    controlled: phoneProp,
    default: '',
  });

  const [code, setCode] = useControlled({
    controlled: codeProp,
    default: '',
  });

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setPhone(e.target.value);
      onChangePhone?.(e);
    },
    [setPhone, onChangePhone],
  );

  const handleChangeCode = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setCode(e.target.value);
      onChangeCode?.(e);
    },
    [setCode, onChangeCode],
  );

  return (
    <div tw="fixed left-0 right-0 w-full max-w-mobile mx-auto h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>휴대폰 변경</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="p-5 flex-1 min-h-0">
        <div tw="text-h2 font-bold mb-6">
          중요 알림을 받으실
          <br />
          휴대폰번호를 입력해 주세요.
        </div>
        <div tw="flex flex-col gap-3">
          <TextField variant="outlined">
            <TextField.PatternInput
              format="###-####-####"
              label="휴대폰번호"
              value={phone}
              onChange={handleChangePhone}
            />
            <TextField.Trailing>
              <Button disabled={phone.length < 1} size="small" onClick={onClickSend}>
                {sent ? '재발송' : '발송'}
              </Button>
            </TextField.Trailing>
          </TextField>
          {sent && (
            <div>
              <TextField variant="outlined" hasError={Boolean(codeErrorMessage)}>
                <TextField.Input label="인증번호" value={code} onChange={handleChangeCode} />
                <TextField.Trailing>
                  <Button disabled={code.length < 1} size="small" onClick={onClickVerifyCode}>
                    확인
                  </Button>
                </TextField.Trailing>
              </TextField>
              {codeErrorMessage && !codeVerified && <TextField.ErrorMessage>{codeErrorMessage}</TextField.ErrorMessage>}
              {codeVerified && <TextField.SuccessMessage>인증되었습니다</TextField.SuccessMessage>}
            </div>
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
