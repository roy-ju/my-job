import { Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import useBack from '@/hooks/useBack';

import Header from './guide/Header';

import Ments from './guide/Ments';

import Faqs from './guide/Faqs';

import Info from './guide/Info';

function SuggestGuide() {
  const { back } = useBack();

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={back} />
        <NavigationHeader.Title>구해요 사용설명서</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 overflow-y-scroll">
        <Header />
        <Ments />
        <Info />
        <Separator tw="bg-gray-1300 h-3 min-h-[12px]" />
        <Faqs />
      </div>
    </div>
  );
}

export default SuggestGuide;
