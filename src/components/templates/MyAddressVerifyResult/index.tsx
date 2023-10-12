import { Button, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import Error12 from '@/assets/icons/error_12.svg';
import ErrorCodes from '@/constants/error_codes';
import { useMemo } from 'react';

type AddressData = {
  addressName?: string;
  categoryName?: string;
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  roadAddressName?: string;
};

type AddressListItem = {
  address_detail?: string;
  full_road_name_address?: string;
  realestate_unique_number?: string;
};

export interface MyAddressVerifyResultProps {
  addressData?: AddressData;
  addressList?: AddressListItem[];
  selectedItemID?: string;
  dong?: string;
  ho?: string;
  errorCode?: string;
  onClickBack?: () => void;
  onClickMultipleItem?: (id?: string) => void;
  onClickMultipleItemCTA?: (id?: string) => void;
  onClickSystemErrorCTA?: () => void;
  onClickInaccurateAddressDetailCTA?: () => void;
}

export default function MyAddressVerifyResult({
  addressData,
  addressList,
  selectedItemID,
  dong,
  ho,
  errorCode,
  onClickBack,
  onClickMultipleItem,
  onClickMultipleItemCTA,
  onClickSystemErrorCTA,
  onClickInaccurateAddressDetailCTA,
}: MyAddressVerifyResultProps) {
  const { SYSTEM_ERROR_OUTERAPI, INACCURATE_ADDRESS_DETAIL } = ErrorCodes;

  const subTitle = useMemo(() => {
    if (addressData?.placeName && dong && ho) {
      return `${addressData.placeName} ${dong}동 ${ho}호`;
    }

    if (addressData?.placeName && !dong && ho) {
      return `${addressData.placeName} ${ho}호`;
    }

    if (addressData?.placeName && dong && !ho) {
      return `${addressData.placeName} ${dong}동`;
    }

    if (addressData?.placeName && !dong && !ho) {
      return `${addressData.placeName}`;
    }

    if (!addressData?.placeName && dong && ho) {
      return `${dong}동 ${ho}호`;
    }

    if (!addressData?.placeName && dong && !ho) {
      return `${dong}동 `;
    }

    if (!addressData?.placeName && !dong && ho) {
      return `${ho}호`;
    }

    return '';
  }, [addressData, dong, ho]);

  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton />}
        <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="px-5 py-10 flex flex-col gap-3">
        <div tw="flex items-center gap-1">
          <Error12 tw="w-4 h-4" />

          {errorCode === INACCURATE_ADDRESS_DETAIL.toString() && (
            <span tw="text-info text-red-800">입력한 주소로 등기부 조회가 되지 않습니다.</span>
          )}

          {errorCode === SYSTEM_ERROR_OUTERAPI.toString() && (
            <span tw="text-info text-red-800">다음에 다시 등록해주세요.</span>
          )}

          {addressList && addressList.length > 1 && (
            <span tw="text-info text-red-800">다수의 등기부가 조회되었습니다.</span>
          )}
        </div>

        <div>
          {errorCode === INACCURATE_ADDRESS_DETAIL.toString() && (
            <p tw="font-bold text-h2">주소지 확인이 필요합니다.</p>
          )}

          {errorCode === SYSTEM_ERROR_OUTERAPI.toString() && (
            <p tw="font-bold text-h2">인터넷등기소가 시스템 점검중입니다.</p>
          )}

          {addressList && addressList.length > 1 && <p tw="font-bold text-h2">주소지 확인이 필요합니다.</p>}
        </div>

        <div>
          {errorCode === INACCURATE_ADDRESS_DETAIL.toString() && (
            <p tw="text-gray-700 text-b2">신축/재건축으로 등기부 조회가 불가한 주택은 매물등록을 할 수 없습니다.</p>
          )}

          {errorCode === SYSTEM_ERROR_OUTERAPI.toString() && (
            <p tw="text-gray-700 text-b2">
              점검은 보통 야간 9시부터 다음날 오전 9시 사이에 이루어집니다. 자세한 점검시간은 인터넷등기소에서
              확인가능합니다.
            </p>
          )}

          {addressList && addressList.length > 1 && (
            <p tw="text-gray-700 text-b2">등록을 희망하시는 등기 주소를 선택해주세요.</p>
          )}
        </div>
      </div>

      {(errorCode === INACCURATE_ADDRESS_DETAIL.toString() || (addressList && addressList.length > 1)) && <Separator />}

      <div tw="flex-1 min-h-0 overflow-auto">
        {errorCode === SYSTEM_ERROR_OUTERAPI.toString() && (
          <div tw="px-5">
            <Button variant="secondary" tw="w-full" size="bigger" onClick={onClickSystemErrorCTA}>
              확인
            </Button>
          </div>
        )}

        {errorCode === INACCURATE_ADDRESS_DETAIL.toString() && (
          <div tw="px-5">
            <div tw="py-10 flex flex-col gap-4">
              <p tw="text-b1 font-bold">기존 입력 주소</p>
              <div tw="flex flex-col">
                {addressData?.roadAddressName && <p tw="text-b1 font-medium">{addressData.roadAddressName}</p>}
                {subTitle && (
                  <>
                    <span tw="text-info text-gray-700 [line-height: 20px]">{subTitle}</span>
                  </>
                )}
              </div>
            </div>
            <Button variant="secondary" tw="w-full" size="bigger" onClick={onClickInaccurateAddressDetailCTA}>
              주소 다시 입력하기
            </Button>
          </div>
        )}

        {addressList && addressList.length > 1 && (
          <div tw="flex flex-col gap-4 px-5 py-10">
            <p tw="text-b1 font-bold">기존 입력 주소</p>
            <div tw="flex flex-col">
              {addressData?.roadAddressName && <p tw="text-b1 font-medium">{addressData.roadAddressName}</p>}
              {addressData?.placeName && (
                <>
                  <span tw="text-info text-gray-700 [line-height: 20px]">{addressData.placeName}</span>
                </>
              )}
            </div>

            {addressList.map((item) => (
              <Button
                onClick={() => onClickMultipleItem?.(item.realestate_unique_number)}
                size="none"
                variant="outlined"
                tw="w-full"
                selected={selectedItemID === item.realestate_unique_number}
                key={item.realestate_unique_number}
              >
                <div tw="w-full text-start p-5 [line-height: 20px]">
                  {item.full_road_name_address}
                  <br />
                  {item.address_detail}
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      {addressList && addressList.length > 1 && (
        <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
          <Button
            variant="secondary"
            size="bigger"
            tw="w-full"
            disabled={!selectedItemID}
            onClick={() => onClickMultipleItemCTA?.(selectedItemID)}
          >
            주소지 선택
          </Button>
        </div>
      )}
    </div>
  );
}
