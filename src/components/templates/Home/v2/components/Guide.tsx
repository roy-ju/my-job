import Image from 'next/image';

import WomanImage from '@/../public/static/images/image_emoji_woman.png';

import GuideButton from './GuideButton';

type GuideProps = {
  handleOpenRegisterMyHomePopup: () => void;
  handleOpenDanjiListPopup: () => void;
};

export default function Guide({ handleOpenRegisterMyHomePopup, handleOpenDanjiListPopup }: GuideProps) {
  return (
    <div tw="px-5 py-10 flex flex-col gap-5">
      <div tw="flex items-center gap-2">
        <h2 tw="text-heading_02">네고시오를 이렇게 사용해보세요</h2>
        <Image width={20} height={20} quality={100} src={WomanImage} alt="" />
      </div>
      <div tw="grid grid-cols-2 grid-rows-2 gap-4">
        <GuideButton variant="map" />
        <GuideButton variant="realprice" handleOpenDanjiListPopup={handleOpenDanjiListPopup} />
        <GuideButton variant="law" />
        <GuideButton variant="register" handleOpenRegisterMyHomePopup={handleOpenRegisterMyHomePopup} />
      </div>
    </div>
  );
}
