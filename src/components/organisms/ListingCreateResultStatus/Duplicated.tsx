import { Ul } from '@/components/atoms';
import { BuyOrRentString } from '@/constants/strings';

interface Props {
  addressLine1: string;
  addressLine2: string;
  buyOrRent: number;
  rentArea?: string;
}

export default function Duplicated({ addressLine1, addressLine2, buyOrRent, rentArea }: Props) {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">이미 등록된 매물주소입니다.</div>
      <Ul tw="mt-2 mb-5">
        <li>등록 신청이 완료된 매물주소, 등록 준비 상태인 매물주소는 추가 등록 신청 을 할 수 없습니다.</li>
        <li>네고시오는 매물 하나당 한번만 등록할 수 있습니다. (1 매물, 1 등록)</li>
      </Ul>
      <div tw="mb-5">
        <div tw="text-b1 leading-none font-bold mb-3">기존 입력 주소</div>
        <div tw="text-b1">{addressLine1}</div>
        <div tw="text-info text-gray-700">{addressLine2}</div>
      </div>
      <div>
        <div tw="text-b1 leading-none font-bold mb-3">기존 선택 거래종류</div>
        <div tw="text-b1">
          {BuyOrRentString[buyOrRent]}
          {rentArea && `, 임대할 부분: ${rentArea}`}
        </div>
      </div>
    </div>
  );
}
