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
      <div tw="text-h2 font-bold">이미 등록된 매물이에요.</div>
      <div tw="mt-2 mb-5 leading-5 text-gray-700 text-info">동일한 주소의 매물은 한 번에 1개만 등록될 수 있어요.</div>
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
