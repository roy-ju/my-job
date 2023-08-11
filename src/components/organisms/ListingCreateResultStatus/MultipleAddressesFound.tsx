import { Button } from '@/components/atoms';
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
      <div tw="text-h2 font-bold">주소 정보를 확인해 주세요.</div>
      <div tw="mt-2.5 mb-5 flex items-center gap-1">
        <ErrorIcon />
        <div tw="text-info leading-4 text-red-800">다수의 등기부가 조회되었어요.</div>
      </div>
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
