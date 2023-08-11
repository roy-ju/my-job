import { Button } from '@/components/atoms';
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
      <div tw="text-h2 font-bold">주소 정보를 확인해 주세요.</div>
      <div tw="my-2.5 flex items-center gap-1">
        <ErrorIcon />
        <div tw="text-info leading-4 text-red-800">입력한 주소로 등기부가 조회되지 않았어요.</div>
      </div>
      <div tw="mb-5 leading-5 text-gray-700 text-info">
        신축/재건축으로 등기부가 조회되지 않는 주택은 등록할 수 없어요.
      </div>
      <div tw="mb-5">
        <div tw="text-b1 leading-none font-bold mb-3">기존 입력 주소</div>
        <div tw="text-b1">{addressLine1}</div>
        <div tw="text-info text-gray-700">{addressLine2}</div>
      </div>
      <Button onClick={onClickUpdateAddress} tw="w-full" variant="secondary" size="bigger">
        주소 다시 입력하기
      </Button>
      <div tw="pt-5 flex justify-center">
        <Button onClick={onClickStartOver} variant="ghost" size="none" tw="underline">
          매물 등록 신청을 처음부터 다시 진행하고 싶어요
        </Button>
      </div>
    </div>
  );
}
