import Image from 'next/image';

import ButtonV2 from '@/components/atoms/ButtonV2';

import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import { NavigationHeader } from '@/components/molecules';

import CharacterImage from '@/../public/static/images/character_mirror.png';

const GuideStepList = [
  '주소를 확인해 주세요.',
  '거래정보(가격 등)를 입력해 주세요.',
  '매물 정보를 입력해 주세요.',
  '중개사를 선택해 주세요.',
  '선택한 중개사가 매물 등록을 완료해요.',
];

const CheckList = [
  {
    title: '상세 주소는 공개되지 않아요.',
    content: '매물등록 신청 시 입력하신 상세 주소는\n중개사님만 확인할 수 있어요.',
  },
  {
    title: '미등기 매물은 등록할 수 없어요.',
    content: '신축, 재건축 등으로 등기부를 조회할 수 없는 주택은\n매물등록을 신청할 수 없어요.',
  },
  {
    title: '소유자만 매물을 등록할 수 있어요.',
    content: '소유자의 대리인으로 매물등록을 신청하실 경우,\n소유자 최소 1인의 동의가 필요해요.',
  },
];

export default function ListingCreateGuideMobilePopup({
  onClickBack,
  onClickListingCreate,
}: {
  onClickBack?: () => void;
  onClickListingCreate?: () => void;
}) {
  return (
    <div tw="w-full relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 pt-7 pb-10 px-5 overflow-auto">
        <div>
          <span tw="text-h2 font-bold">
            매물등록은
            <br />
            아래와 같은 순서로 진행됩니다.
          </span>
        </div>
        <div tw="flex flex-col gap-2 pt-5">
          {GuideStepList.map((item, index) => (
            <div
              key={item}
              tw="flex flex-row items-center gap-2 [box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1)] px-5 py-3 [border-radius: 8px]"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(0deg, #7048E8, #7048E8), #4263EB',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                }}
              >
                <span tw="text-info text-white font-bold">{index + 1}</span>
              </div>
              <span tw="text-b2">{item}</span>
            </div>
          ))}
        </div>
        <div
          tw="relative mt-[69px] pl-8 pr-6 py-4 [border-radius: 8px]"
          style={{ background: 'linear-gradient(90deg, #5661D1 0%, #715FE2 100%)' }}
        >
          <span tw="text-b2 font-bold text-white">매물등록 전 필수 체크리스트!</span>
          <Image
            width={100}
            height={100}
            src={CharacterImage.src}
            alt=""
            style={{ position: 'absolute', bottom: 0, right: '24px' }}
          />
        </div>
        <div tw="flex flex-col gap-8 pt-10">
          {CheckList.map((item) => (
            <div key={item.title} tw="flex flex-col gap-3">
              <p tw="text-b1 font-bold">{item.title}</p>
              <p tw="text-b2 whitespace-pre-wrap">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <PersistentBottomBarV2>
        <ButtonV2 tw="w-full" size="bigger" onClick={onClickListingCreate}>
          매물등록 신청하러 가기
        </ButtonV2>
      </PersistentBottomBarV2>
    </div>
  );
}
