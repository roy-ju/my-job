import { ChangeEventHandler, useCallback } from 'react';

import tw from 'twin.macro';

import { Button, PersistentBottomBar } from '@/components/atoms';

import { NavigationHeader, TextField } from '@/components/molecules';

import useControlled from '@/hooks/useControlled';

import DeleteAllIcon from '@/assets/icons/delete_all.svg';

export interface MyUpdatePhoneProps {
  phone?: string;
  code?: string;
  sent?: boolean;
  minutes?: number;
  seconds?: number;
  codeVerified?: boolean;
  codeErrorMessage?: string;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;
  onChangeCode?: ChangeEventHandler<HTMLInputElement>;
  onClickSend?: () => void;
  onClickVerifyCode?: () => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
  onClickRemovePhoneValue?: () => void;
}

export default function MyUpdatePhone({
  sent = false,
  phone: phoneProp,
  code: codeProp,
  minutes = 0,
  seconds = 0,
  codeVerified = false,
  codeErrorMessage,
  onChangePhone,
  onChangeCode,
  onClickNext,
  onClickBack,
  onClickSend,
  onClickVerifyCode,
  onClickRemovePhoneValue,
}: MyUpdatePhoneProps) {
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

  const renderRequestVerificationButtonText = () => {
    if (!codeVerified && phone.length > 0) {
      if (sent) return '재발송';
      return '인증';
    }
    return '변경';
  };

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>휴대폰 번호 변경</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="p-5 flex-1 min-h-0 overflow-auto">
        <div tw="text-h2 font-bold mb-6">
          중요 알림을 받으실
          <br />
          휴대폰번호를 입력해 주세요.
        </div>
        <div tw="flex flex-col gap-3" css={[codeVerified && tw`gap-0`]}>
          <TextField variant="outlined">
            <TextField.PatternInput
              format="###-####-####"
              label="휴대폰번호"
              value={phone}
              onChange={handleChangePhone}
            />
            {!codeVerified && phone.length > 1 && (
              <TextField.Trailing>
                <button onClick={onClickRemovePhoneValue} type="button" tw="flex items-center w-4 h-4">
                  <DeleteAllIcon />
                </button>
              </TextField.Trailing>
            )}
            <TextField.Trailing>
              <Button disabled={codeVerified || phone.length < 1} size="small" onClick={onClickSend}>
                {renderRequestVerificationButtonText()}
              </Button>
            </TextField.Trailing>
          </TextField>
          {sent && (
            <div>
              {!codeVerified && (
                <TextField variant="outlined" hasError={Boolean(codeErrorMessage)}>
                  <TextField.Input label="인증번호" value={code} onChange={handleChangeCode} />
                  {sent && (
                    <TextField.Trailing>
                      <span tw="text-info text-red-800">
                        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                      </span>
                    </TextField.Trailing>
                  )}
                  <TextField.Trailing>
                    <Button
                      disabled={Boolean(codeErrorMessage) || code.length < 1}
                      size="small"
                      onClick={onClickVerifyCode}
                    >
                      확인
                    </Button>
                  </TextField.Trailing>
                </TextField>
              )}
              {codeErrorMessage && !codeVerified && <TextField.ErrorMessage>{codeErrorMessage}</TextField.ErrorMessage>}
              {codeVerified && <TextField.SuccessMessage>인증되었습니다</TextField.SuccessMessage>}
            </div>
          )}
        </div>
      </div>
      <PersistentBottomBar>
        <Button disabled={!codeVerified} size="bigger" variant="secondary" tw="w-full" onClick={onClickNext}>
          등록 완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
