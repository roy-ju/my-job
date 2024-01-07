import { Separator } from '@/components/atoms';

// import News from '@/components/organisms/News';

import SuggestForm from './SuggestForm';

import NavigationGuide from './NavigationGuide';

import UserGuide from './UserGuide';

export default function Contents() {
  return (
    <main>
      <SuggestForm />
      <NavigationGuide />
      <Separator tw="bg-gray-200 h-2" />
      <UserGuide />
      {/* <News>
        <News.CarouselType query="부동산" />
      </News> */}
      {/* <Separator tw="bg-gray-200 h-2" /> */}
    </main>
  );
}
