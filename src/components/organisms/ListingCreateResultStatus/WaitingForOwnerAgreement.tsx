import { Button, Separator } from '@/components/atoms';
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
  const [expanded, setExpanded] = useState(false);

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
      <p tw="mt-2 mb-5 text-info text-gray-700">
        동의 요청을 진행할 소유자 명의의 휴대폰으로만 매물등록에 대한 동의를 진행할 수 있습니다.
      </p>
      <Separator tw="-mx-5 mb-10" />
      <div tw="mb-7">
        <div tw="text-b1 font-bold mb-4">소유자 동의 전송</div>
        <div tw="text-b1 ">
          <span tw="text-nego-800 font-bold">
            {ownerName} {ownerPhoneNum}
          </span>{' '}
          번호로
          <br />
          문자가 전송되었습니다.
        </div>
        <div tw="text-info leading-6 text-gray-700">공동명의의 소유자에게도 동의 요청을 발송할 수 있습니다.</div>
      </div>

      {!expanded && (
        <div>
          <Button isLoading={isLoading} onClick={() => setExpanded(true)} tw="w-full" variant="secondary" size="bigger">
            새로운 소유자(번호)로 전송
          </Button>
          <div tw="pt-3 flex justify-center">
            <Button
              isLoading={isLoading}
              variant="ghost"
              size="none"
              tw="underline"
              onClick={() => onClickSend?.(ownerName ?? '', ownerPhone ?? '')}
            >
              기존 번호로 재전송
            </Button>
          </div>
        </div>
      )}

      {expanded && (
        <div>
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
            위 소유자에게 문자 전송하기
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
      )}
    </div>
  );
}
