import { Button, Ul } from '@/components/atoms';
import ErrorIcon from '@/assets/icons/error.svg';

interface Props {
  addressLine1: string;
  addressLine2: string;
  onClickUpdateAddress?: () => void;
  onClickStartOver?: () => void;
}

export default function NoAddressFound({ addressLine1, addressLine2, onClickUpdateAddress, onClickStartOver }: Props) {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">주소지 확인이 필요합니다.</div>
      <div tw="my-2.5 flex items-center gap-1">
        <ErrorIcon />
        <div tw="text-info leading-4 text-red-800">입력한 주소로 등기부 조회가 되지 않습니다.</div>
      </div>
      <Ul tw="mb-5">
        <li>신축/재건축으로 등기부 조회가 불가한 주택은 매물등록을 할 수 없습니다.</li>
        <li>거래조건 수정은 주소지 확인 후, 담당 중개사에게 수정 요청해 주세요.</li>
      </Ul>
      <div tw="mb-5">
        <div tw="text-b1 leading-none font-bold mb-3">기존 입력 주소</div>
        <div tw="text-b1">{addressLine1}</div>
        <div tw="text-info text-gray-700">{addressLine2}</div>
      </div>
      <Button onClick={onClickUpdateAddress} tw="w-full" variant="secondary" size="bigger">
        주소 정보 수정
      </Button>
      <div tw="pt-5 flex justify-center">
        <Button onClick={onClickStartOver} variant="ghost" size="none" tw="underline">
          매물등록 신청 다시하기
        </Button>
      </div>
    </div>
  );
}
