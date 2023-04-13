import { Button, Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import DeleteAllIcon from '@/assets/icons/delete_all.svg';

interface OwnerConsentProps {}

export default function OwnerConsent() {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">소유자 동의가 필요합니다.</div>
      <Ul tw="mt-2 mb-5">
        <li>소유자 본인 명의의 휴대폰 번호로만 매물등록 동의를 진행할 수 있습니다.</li>
        <li>문자 발송 후 7일 이내에 소유자가 동의하지 않으면, 매물등록이 자동 취소됩니다.</li>
      </Ul>
      <div tw="mb-5">
        <div tw="text-b1 ">
          <span tw="text-nego font-bold">김네고 010-1234-4576</span> 번호로
          <br />
          문자가 전송되었습니다.
        </div>
        <div tw="text-info leading-6 text-gray-700">공동명의의 소유자에게도 동의 요청을 발송할 수 있습니다.</div>
      </div>
      <div tw="flex flex-col gap-3 mb-5">
        <TextField variant="outlined">
          <TextField.Input label="소유자 성명" />
          <TextField.Trailing tw="flex items-center">
            <button type="button" tw="inline-flex items-center justify-center w-5 h-5 mr-4">
              <DeleteAllIcon />
            </button>
          </TextField.Trailing>
        </TextField>
        <TextField variant="outlined">
          <TextField.Input label="휴대폰 번호" />
          <TextField.Trailing tw="flex items-center">
            <button type="button" tw="inline-flex items-center justify-center w-5 h-5 mr-4">
              <DeleteAllIcon />
            </button>
          </TextField.Trailing>
        </TextField>
      </div>
      <Button tw="w-full" variant="secondary" size="bigger">
        공동명의 소유자(번호)로 전송
      </Button>
      <div tw="pt-5 flex justify-center">
        <Button variant="ghost" size="none" tw="underline">
          기존 입력 소유자(번호)로 전송
        </Button>
      </div>
    </div>
  );
}
