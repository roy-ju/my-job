import { Button, Ul } from '@/components/atoms';
import ErrorIcon from '@/assets/icons/error.svg';

export interface AddressListItem {
  addressDetail: string;
  fullRoadNameAddress: string;
  realestateUniqueNumber: string;
}

interface Props {
  addressLine1: string;
  addressLine2: string;
  addressList?: AddressListItem[];
  onClickItem?: (realestateUniqueNumber: string) => void;
}

export default function MultipleAddressesFound({ addressLine1, addressLine2, addressList, onClickItem }: Props) {
  return (
    <div tw="px-5">
      <div tw="text-h2 font-bold">다수의 등기부가 조회되었습니다.</div>
      <div tw="my-2.5 flex items-center gap-1">
        <ErrorIcon />
        <div tw="text-info leading-4 text-red-800">정확한 주소지를 선택해 주세요.</div>
      </div>
      <Ul tw="mb-5">
        <li>거래조건 수정은 주소지 확인 후, 담당 중개사에게 수정 요청해 주세요.</li>
      </Ul>
      <div tw="mb-5">
        <div tw="text-b1 leading-none font-bold mb-3">기존 입력 주소</div>
        <div tw="text-b1">{addressLine1}</div>
        <div tw="text-info text-gray-700">{addressLine2}</div>
      </div>
      <div tw="flex flex-col gap-4">
        {addressList?.map((item) => (
          <Button
            onClick={() => onClickItem?.(item.realestateUniqueNumber)}
            size="none"
            variant="outlined"
            tw="w-full"
            key={item.realestateUniqueNumber}
          >
            <div tw="w-full text-start p-5">
              {item.fullRoadNameAddress}
              <br />
              {item.addressDetail}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
