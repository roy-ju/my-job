import { Separator } from '@/components/atoms';

// import News from '@/components/organisms/News';

import SuggestForm from './SuggestForm';

import NavigationGuide from './NavigationGuide';

import UserGuide from './UserGuide';

type ContentsProps = {
  handleOpenDanjiListPopup: () => void;
};

export default function Contents({ handleOpenDanjiListPopup }: ContentsProps) {
  return (
    <main>
      <SuggestForm />
      <NavigationGuide handleOpenDanjiListPopup={handleOpenDanjiListPopup} />
      <Separator tw="bg-gray-200 h-2" />
      <UserGuide />
      {/* <News>
        <News.CarouselType query="부동산" />
      </News> */}
      {/* <Separator tw="bg-gray-200 h-2" /> */}
    </main>
  );
}
