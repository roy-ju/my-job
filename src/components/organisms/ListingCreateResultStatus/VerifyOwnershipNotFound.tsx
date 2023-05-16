import { Button, Separator } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import ErrorIcon from '@/assets/icons/error.svg';
import { useCallback, useState } from 'react';

interface Props {
  address?: string;
  addressDetail?: string;
  isLoading?: boolean;
  onClickSend?: (name: string, phone: string) => void;
}

export default function VerifyOwnershipNotFound({ address, addressDetail, isLoading, onClickSend }: Props) {
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
        <div tw="text-info leading-4 text-red-800">정확한 소유자 정보를 입력해 주세요.</div>
      </div>
      <p tw="mb-10 text-info text-gray-700">소유자의 대리인이 매물등록 신청을 하신다면, 소유자 동의가 필요합니다.</p>
      <Separator tw="-mx-5 mb-10" />
      <div tw="text-b1 font-bold mb-4">기존 입력 주소</div>
      <div tw="text-b1 mb-1">{address}</div>
      <div tw="text-info text-gray-700">{addressDetail}</div>
      <Separator tw="-mx-5 h-px my-7 bg-gray-300" />
      <div tw="flex flex-col gap-3 mb-5">
        <div tw="text-b1 font-bold mb-4">소유자 동의 전송</div>
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
        <p tw="text-info text-gray-700">
          소유자 명의의 휴대폰 번호가 맞는지 다시 한번 확인해 주세요.
          <br />
          (본인인증 후 동의가능)
        </p>
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
