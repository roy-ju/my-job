import { Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { ChangeEventHandler } from 'react';

export interface OwnerInfoProps {
  name?: string;
  phone?: string;
  onChangeName?: ChangeEventHandler<HTMLInputElement>;
  onChangePhone?: ChangeEventHandler<HTMLInputElement>;
}

export default function OwnerInfo({ name, phone, onChangeName, onChangePhone }: OwnerInfoProps) {
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
          <TextField.Input label="소유자 성명 입력" value={name} onChange={onChangeName} />
        </TextField>
        <TextField variant="outlined">
          <TextField.PatternInput
            format="###-####-####"
            label="소유자 휴대폰번호 입력"
            value={phone}
            onChange={onChangePhone}
          />
        </TextField>
      </div>
    </div>
  );
}
