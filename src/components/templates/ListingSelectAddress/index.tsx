import { MyAddressListListItem } from '@/apis/my/getMyAddressList';
import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { makeAddressDetail } from '@/utils/fotmat';

export interface ListingSelectAddressProps {
  list?: MyAddressListListItem[] | null;
  selectedUserAddressID?: number;
  onClickBack?: () => void;
  onClickNext?: () => void;
  onClickItem?: (id: number) => void;
  onClickAddMyAddress?: () => void;
}

export default function ListingSelectAddress({
  list,
  selectedUserAddressID,
  onClickBack,
  onClickNext,
  onClickItem,
  onClickAddMyAddress,
}: ListingSelectAddressProps) {
  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 pt-6">
        <p tw="text-h2 font-bold [letter-spacing: -0.4px]">
          아래의 주소지로
          <br />
          매물 등록을 신청하시겠습니까?
        </p>
      </div>
      <div tw="flex-1 min-h-0 px-5 overflow-auto">
        <div tw="flex flex-col gap-4 py-8 pb-6">
          {list?.map((item) => (
            <Button
              onClick={() => onClickItem?.(item.id)}
              size="none"
              variant="outlined"
              tw="w-full"
              selected={selectedUserAddressID === item.id}
              key={item.id}
            >
              <div tw="w-full text-start p-5 [line-height: 20px]">
                {item.road_name_address}
                <br />
                {makeAddressDetail({ danjiName: item.danji_name, dong: item.dong, ho: item.ho })}
              </div>
            </Button>
          ))}
        </div>
        {/* <AddressSearchForm onSubmit={onSubmit} /> */}
      </div>
      <div tw="flex flex-col gap-2 pb-6 px-5">
        <p tw="text-info text-gray-700">{`다른 주소지로 매물 등록을 원하신다면, 마이페이지 > 우리집 내놓기에서 우리집 주소를 등록해주세요.`}</p>

        <button
          type="button"
          tw="w-fit text-info text-nego [text-decoration-line: underline]"
          onClick={onClickAddMyAddress}
        >
          우리집 주소 등록 바로가기
        </button>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" disabled={!selectedUserAddressID} onClick={() => onClickNext?.()}>
          확인
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
