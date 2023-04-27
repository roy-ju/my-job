import { Button, Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import ErrorIcon from '@/assets/icons/error.svg';
import { useCallback, useState } from 'react';

interface Props {
  isLoading?: boolean;
  onClickSend?: (name: string, phone: string) => void;
}

export default function VerifyOwnershipNotFound({ isLoading, onClickSend }: Props) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const [nameErrMsg, setNameErrMsg] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');

  const handleSend = useCallback(() => {
    setNameErrMsg('');
    setPhoneErrMsg('');

    if (!name) {
      setNameErrMsg('이름을 입력해주세요.');

      return;
    }

    if (phone.length !== 11) {
      setPhoneErrMsg('휴대폰 입력해주세요.');
      return;
    }

    onClickSend?.(name, phone);
  }, [name, phone, onClickSend]);

  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">소유자 정보가 정확하지 않습니다.</div>
      <div tw="my-2.5 flex items-center gap-1">
        <ErrorIcon />
        <div tw="text-info leading-4 text-red-800">입력한 주소로 등기부 조회가 되지 않습니다.</div>
      </div>
      <Ul tw="mb-5">
        <li>소유자의 대리인이 매물등록 신청을 하신다면, 소유자 동의가 필요합니다. </li>
        <li>문자 발송 후 7일 이내에 소유자가 동의하지 않으면, 매물등록이 자동 취소 됩니다.</li>
      </Ul>
      <div tw="flex flex-col gap-3 mb-5">
        <TextField variant="outlined" hasError={!!nameErrMsg}>
          <TextField.Input label="소유자 성명" value={name} onChange={(e) => setName(e.target.value)} />
        </TextField>
        <div>
          <TextField variant="outlined" hasError={!!phoneErrMsg}>
            <TextField.PatternInput
              format="###-####-####"
              label="휴대폰 번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </TextField>
          {phoneErrMsg && <TextField.ErrorMessage>{phoneErrMsg}</TextField.ErrorMessage>}
        </div>
      </div>
      <Button
        isLoading={isLoading}
        onClick={handleSend}
        disabled={!phone || !name}
        tw="w-full"
        variant="secondary"
        size="bigger"
      >
        소유자 정보 입력 완료
      </Button>
    </div>
  );
}
