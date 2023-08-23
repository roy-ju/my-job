import { Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { ChangeEventHandler } from 'react';
import ErrorIcon from '@/assets/icons/error.svg';
import DeleteIcon from '@/assets/icons/close_contained.svg';
import { regPhone } from '@/utils/regex';

export interface OwnerInfoProps {
  name?: string;
  onChangeName?: ChangeEventHandler<HTMLInputElement>;

  phone?: string;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;

  onClickNameDeleteIcon?: () => void;
  onClickPhoneDeleteIcon?: () => void;
}

export default function OwnerInfo({
  name,
  onChangeName,

  phone,
  onChangePhone,

  onClickNameDeleteIcon,
  onClickPhoneDeleteIcon,
}: OwnerInfoProps) {
  return (
    <div>
      <Ul tw="mb-5">
        <li>아래 정보를 입력 시 정당한 소유자의 대리인으로서 신청한 것으로 간주합니다.</li>
        <li>기입하시는 휴대폰 번호로 소유자 동의 요청 문자가 발송됩니다.</li>
        <li>소유자의 본인인증 후 동의가 가능합니다.</li>
        <li>휴대폰 번호는 소유자 확인 및 동의를 받기 위한 문자 전송을 위해서만 사용 됩니다.</li>
      </Ul>
      <div tw="flex flex-col gap-3">
        <TextField variant="outlined">
          <TextField.Input label={name ? '소유자 성명' : '소유자 성명 입력'} value={name} onChange={onChangeName} />

          {name && onClickNameDeleteIcon && (
            <TextField.Trailing tw="pr-4 cursor-pointer" onClick={onClickNameDeleteIcon}>
              <DeleteIcon />
            </TextField.Trailing>
          )}
        </TextField>

        <TextField variant="outlined" hasError={phone ? !regPhone.test(phone) : false}>
          <TextField.PatternInput
            format="###-####-####"
            label={phone ? '소유자 휴대폰 번호' : '소유자 휴대폰 번호 입력'}
            value={phone}
            onChange={onChangePhone}
          />

          {phone && onClickPhoneDeleteIcon && (
            <TextField.Trailing tw="pr-4 cursor-pointer" onClick={onClickPhoneDeleteIcon}>
              <DeleteIcon />
            </TextField.Trailing>
          )}
        </TextField>

        {phone && !regPhone.test(phone) && (
          <div tw="flex items-center gap-1">
            <ErrorIcon />
            <span tw="text-info text-red-800 [line-height: 12px] [letter-spacing: -0.2px]">
              유효한 휴대폰 번호를 입력해주세요.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
