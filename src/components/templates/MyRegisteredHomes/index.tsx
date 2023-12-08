import { MyAddressListListItem } from '@/apis/my/getMyAddressList';
import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { MyRegisteredHomesListItem } from '@/components/organisms';
import { MyAddressStatus } from '@/constants/enums';
import tw from 'twin.macro';
import PlusIcon from '@/assets/icons/plus_gray_16.svg';
import { makeAddressDetail } from '@/utils/fotmat';

interface MyRegisteredHomesProps {
  list?: MyAddressListListItem[] | null;
  onClickBack?: () => void;
  onClickSendSMS?: (id: number, roadNameAddress?: string, addressDetail?: string) => void;
  onClickDeleteIcon?: (id?: number | undefined, address?: string | undefined) => void;
  onClickAddMyAddress?: () => void;
}

export default function MyRegisteredHomes({
  list,
  onClickBack,
  onClickSendSMS,
  onClickDeleteIcon,
  onClickAddMyAddress,
}: MyRegisteredHomesProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title tw="text-b1">우리집 정보</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="py-10 px-5">
        <p tw="text-b1 font-bold pb-7">집주인 인증된 우리집 목록</p>
        <>
          {list &&
            list.length > 0 &&
            list.map((item, index) => (
              <div key={item.id} tw="border-b border-b-gray-300" css={[index === list.length - 1 && tw`border-b-0`]}>
                <MyRegisteredHomesListItem
                  roadnameAddress={item.road_name_address || ''}
                  addressDetail={makeAddressDetail({ danjiName: item.danji_name, dong: item.dong, ho: item.ho })}
                  notVerified={item.status === MyAddressStatus.WaitingForOwnerAgreement}
                  onClickDeleteIcon={() => {
                    const fullAddressDetail = `${item.road_name_address}. ${makeAddressDetail({
                      danjiName: item.danji_name,
                      dong: item.dong,
                      ho: item.ho,
                    })}`;

                    onClickDeleteIcon?.(item.id, fullAddressDetail);
                  }}
                  onClickSendSMS={() =>
                    onClickSendSMS?.(
                      item.id,
                      item.road_name_address || '',
                      makeAddressDetail({ danjiName: item.danji_name, dong: item.dong, ho: item.ho }),
                    )
                  }
                />
              </div>
            ))}
        </>
        <div tw="pt-7">
          <Button tw="w-full" variant="primary" onClick={onClickAddMyAddress}>
            <PlusIcon tw="mr-1" />
            우리집 추가
          </Button>
          <p tw="text-b2 text-gray-700 text-center mt-3">공동소유의 집이나 대리인 인증도 가능해요.</p>
        </div>
      </div>
    </div>
  );
}
