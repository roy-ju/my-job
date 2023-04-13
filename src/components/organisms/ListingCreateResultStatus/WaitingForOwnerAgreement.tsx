import { Button, Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  ownerName?: string;
  ownerPhone?: string;
  isLoading?: boolean;
  onClickSend?: (name: string, phone: string) => void;
}

export default function WaitingForOwnerAgreement({ ownerName, ownerPhone, isLoading, onClickSend }: Props) {
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

  const ownerPhoneNum = useMemo(() => ownerPhone?.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`), [ownerPhone]);

  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">소유자 동의가 필요합니다.</div>
      <Ul tw="mt-2 mb-5">
        <li>소유자 본인 명의의 휴대폰 번호로만 매물등록 동의를 진행할 수 있습니다.</li>
        <li>문자 발송 후 7일 이내에 소유자가 동의하지 않으면, 매물등록이 자동 취소됩니다.</li>
      </Ul>
      <div tw="mb-5">
        <div tw="text-b1 ">
          <span tw="text-nego font-bold">
            {ownerName} {ownerPhoneNum}
          </span>{' '}
          번호로
          <br />
          문자가 전송되었습니다.
        </div>
        <div tw="text-info leading-6 text-gray-700">공동명의의 소유자에게도 동의 요청을 발송할 수 있습니다.</div>
      </div>
      <div tw="flex flex-col gap-3 mb-5">
        <TextField variant="outlined" hasError={!!nameErrMsg}>
          <TextField.Input label="소유자 성명" value={name} onChange={(e) => setName(e.target.value)} />
        </TextField>
        <div>
          <TextField variant="outlined" hasError={!!phoneErrMsg}>
            <TextField.Input label="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
        공동명의 소유자(번호)로 전송
      </Button>
      <div tw="pt-5 flex justify-center">
        <Button
          isLoading={isLoading}
          variant="ghost"
          size="none"
          tw="underline"
          onClick={() => onClickSend?.(ownerName ?? '', ownerPhone ?? '')}
        >
          기존 입력 소유자(번호)로 전송
        </Button>
      </div>
    </div>
  );
}
