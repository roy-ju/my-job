import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';
import ShareIcon from '@/assets/icons/chain.svg';
import OutsideClick from '@/components/atoms/OutsideClick';

interface Props {
  onClickOutside?: () => void;
  onClickShareViaKakao?: () => void;
  onClickCopyUrl?: () => void;
}

export default function SharePopup({ onClickOutside, onClickShareViaKakao, onClickCopyUrl }: Props) {
  return (
    <OutsideClick onOutsideClick={onClickOutside}>
      <div tw="py-6 px-14 flex bg-white rounded-2xl">
        <button
          type="button"
          tw="w-[112px] flex flex-col items-center justify-center rounded-lg hover:bg-gray-100 py-2"
          onClick={onClickCopyUrl}
        >
          <div tw="mb-2 w-[60px] h-[60px] rounded-full bg-gray-400 flex items-center justify-center">
            <ShareIcon />
          </div>
          <div tw="text-b2">URL 복사</div>
        </button>
        <button
          type="button"
          tw="w-[112px] flex flex-col items-center justify-center rounded-lg hover:bg-gray-100 py-2"
          onClick={onClickShareViaKakao}
        >
          <div tw="mb-2 w-[60px] h-[60px] rounded-full bg-yellow-kakao flex items-center justify-center">
            <KakaoLogoIcon />
          </div>
          <div tw="text-b2">카카오톡 공유</div>
        </button>
      </div>
    </OutsideClick>
  );
}
