import { Button, PersistentBottomBar } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { MyAddressListItem } from '@/services/my/types';

import { makeAddressDetail } from '@/utils/fotmat';

export interface SelectAddressTemplateProps {
  type?: 'suggest' | 'listing';
  list?: MyAddressListItem[] | null;
  selectedUserAddressID?: number;
  onClickBack?: () => void;
  onClickNext?: () => void;
  onClickItem?: (id: number) => void; // 매물 등록
  onClickItemSuggest?: (id: number, ra: string, dn: string, dong: string, ho: string, floor?: string) => void; // 추천
  onClickAddMyAddress?: () => void;
}

const Ments = {
  listing: {
    title: '매물등록',
    subTitle: '매물 등록을 신청하시겠습니까?',
    p: '다른 주소지로 매물 등록을 원하신다면, 마이페이지 > 우리집 내놓기에서 우리집 주소를 등록해주세요.',
  },

  suggest: {
    title: '매물추천',
    subTitle: '매물 추천을 신청하시겠습니까?',
    p: '다른 주소지로 매물 추천을 원하신다면, 마이페이지 > 우리집 내놓기에서 우리집 주소를 등록해주세요.',
  },
};

export default function SelectAddressTemplate({
  type,
  list,
  selectedUserAddressID,
  onClickBack,
  onClickNext,
  onClickItem,
  onClickItemSuggest,
  onClickAddMyAddress,
}: SelectAddressTemplateProps) {
  if (!list || list?.length === 0) return null;

  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        {type && <NavigationHeader.Title>{Ments[type].title}</NavigationHeader.Title>}
      </NavigationHeader>
      <div tw="px-5 pt-6">
        {type && (
          <p tw="text-h2 font-bold [letter-spacing: -0.4px]">
            아래의 주소지로
            <br />
            {Ments[type].subTitle}
          </p>
        )}
      </div>
      <div tw="flex-1 min-h-0 px-5 overflow-auto">
        <div tw="flex flex-col gap-4 py-8 pb-6">
          {list?.map((item) => (
            <Button
              onClick={() => {
                onClickItem?.(item.id);
                onClickItemSuggest?.(
                  item.id,
                  item.road_name_address,
                  item.danji_name,
                  item.dong,
                  item.ho,
                  item.floor || '',
                );
              }}
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
        <div tw="flex flex-col gap-2 pb-6">
          {type && <p tw="text-info text-gray-700">{Ments[type].p}</p>}
          <button
            type="button"
            tw="w-fit text-info text-nego [text-decoration-line: underline]"
            onClick={onClickAddMyAddress}
          >
            우리집 주소 등록 바로가기
          </button>
        </div>
      </div>
      <PersistentBottomBar>
        <Button tw="w-full mb-[26px]" size="bigger" disabled={!selectedUserAddressID} onClick={() => onClickNext?.()}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
