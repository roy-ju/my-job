import CharacterImage from '@/../public/static/images/character_mirror.png';
import CloseIcon from '@/assets/icons/close_24.svg';
import { HTMLProps } from 'react';
import Image from 'next/image';
import { useControlled } from '@/hooks/utils';

interface IOListItem extends Omit<HTMLProps<HTMLLIElement>, 'size' | 'as'> {
  contents: string;
  order: number;
}

function OListItem({ contents, order, ...others }: IOListItem) {
  return (
    <li
      tw="flex flex-row items-center gap-2 [box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1)] px-5 py-3 [border-radius: 8px]"
      {...others}
    >
      <div tw="flex items-center justify-center bg-nego-700 h-5 w-5 rounded-full">
        <span tw="text-info text-white font-bold">{order}</span>
      </div>
      <span tw="text-b2 text-gray-1000">{contents}</span>
    </li>
  );
}

interface ListingCreateGuidePopupProps extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'as'> {
  ref?: React.Ref<HTMLDivElement>;
  onClickClosePopup?: () => void;
  isPopupOpen?: boolean;
}

export default function ListingCreateGuidePopup({
  onClickClosePopup,
  isPopupOpen: isPopupOpenProp,
  ...others
}: ListingCreateGuidePopupProps) {
  const [isPopupOpen, setIsPopupOpen] = useControlled({ controlled: isPopupOpenProp, default: true });

  if (!isPopupOpen) return null;

  return (
    <div tw="bg-white rounded-lg [box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.1)]" {...others}>
      <div tw="px-5 flex py-4 relative justify-center">
        <div tw="text-gray-1000 font-bold text-b1">매물등록신청</div>
        <button
          type="button"
          tw="absolute right-5"
          onClick={() => {
            onClickClosePopup?.();
            setIsPopupOpen(false);
          }}
        >
          <CloseIcon />
        </button>
      </div>
      <div tw="px-8 py-6">
        <div tw="[margin-bottom: 70px]">
          <div tw="font-bold text-h2 text-center mb-5">매물등록은 아래와 같은 순서로 진행됩니다.</div>
          <ol tw="grid grid-cols-2 gap-2">
            <OListItem contents="주소를 검색해 주세요." order={1} />
            <OListItem contents="거래정보(가격 등)를 입력해 주세요." order={2} />
            <OListItem contents="매물 정보를 입력해 주세요." order={3} />
            <OListItem contents="중개사를 선택해 주세요." order={4} />
            <OListItem contents="선택한 중개사가 매물 등록을 완료해요." order={5} tw="col-span-2" />
          </ol>
        </div>
        <div>
          <div
            tw="flex justify-evenly rounded-lg bg-no-repeat bg-center py-5 bg-cover mb-10 relative"
            style={{
              background: `linear-gradient(90deg, #5661D1 0%, #715FE2 100%)`,
            }}
          >
            <span tw="text-b2 font-bold text-white">매물 등록 전</span>
            <Image width={100} height={100} tw="absolute bottom-0" src={CharacterImage} alt="character" />
            <span tw="text-b2 font-bold text-white">필수 체크리스트!</span>
          </div>
          <ul tw="text-gray-1000 flex flex-col gap-10">
            <li>
              <p tw="font-bold text-b1">상세 주소는 공개되지 않아요.</p>
              <p tw="text-b2">매물등록 신청 시 입력하신 상세 주소는 중개사님만 확인할 수 있어요.</p>
            </li>
            <li>
              <p tw="font-bold text-b1">미등기 매물은 등록할 수 없어요.</p>
              <p tw="text-b2">신축, 재건축 등으로 등기부를 조회할 수 없는 주택은 매물등록을 신청할 수 없어요.</p>
            </li>
            <li>
              <p tw="font-bold text-b1">소유자만 매물을 등록할 수 있어요. </p>
              <p tw="text-b2">소유자의 대리인으로 매물등록을 신청하실 경우, 소유자 최소 1인의 동의가 필요해요.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
