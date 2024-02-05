import { ChangeEventHandler } from 'react';

import tw from 'twin.macro';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { TextFieldV2 } from '@/components/molecules';

import CloseContained from '@/assets/icons/close_contained.svg';

import ErrorIcon from '@/assets/icons/error.svg';

interface NicknameProps {
  errorMessage?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  handleClientValidation?: () => void;
  handleResetNickName?: () => void;
  handleResetErrorMsg?: () => void;
}

export default function Nickname({
  value,
  errorMessage,
  onChange,
  handleResetNickName,
  handleResetErrorMsg,
  handleClientValidation,
}: NicknameProps) {
  return (
    <div tw="px-5">
      <p tw="text-heading_01 mb-1">닉네임</p>
      <p tw="text-body_01 text-gray-700 mb-4">원하는 닉네임을 입력해주세요.</p>
      <TextFieldV2
        variant="outlined"
        hasError={Boolean(errorMessage)}
        onFocus={() => {
          handleResetErrorMsg?.();
        }}
        onBlur={() => {
          if (value) {
            setTimeout(() => {
              handleClientValidation?.();
            }, 100);
          }
        }}
      >
        <TextFieldV2.Input label="닉네임" value={value} onChange={onChange} />

        {value && (
          <TextFieldV2.Trailing css={[errorMessage ? tw`pr-3` : tw`pr-4`]}>
            <ButtonV2
              variant="ghost"
              onMouseDown={(e) => {
                e?.stopPropagation();
                handleResetNickName?.();
              }}
              tw="p-0"
            >
              <CloseContained />
            </ButtonV2>
          </TextFieldV2.Trailing>
        )}

        {errorMessage && (
          <TextFieldV2.Trailing tw="pr-4">
            <ErrorIcon />
          </TextFieldV2.Trailing>
        )}
      </TextFieldV2>

      <p tw="text-body_01 mt-1 pl-2" css={[errorMessage ? tw`text-red-800` : tw`text-gray-700`]}>
        {errorMessage || '3자 이상 20자 이하의 한글, 영문, 숫자만 사용 가능해요!'}
      </p>
    </div>
  );
}
