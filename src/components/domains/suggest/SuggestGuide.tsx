import Separator from '@/components/atoms/Separator';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useBack from '@/hooks/useBack';

import Header from './guide/Header';

import Ments from './guide/Ments';

import Faqs from './guide/Faqs';

import Info from './guide/Info';

import ActionButton from './guide/ActionButton';

import useGoSuggestForm from './guide/hooks/useGoSuggestForm';

function SuggestGuide() {
  const { back } = useBack();

  const { handleClickGoSuggestForm } = useGoSuggestForm();

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={back} />
        <NavigationHeader.Title>구해요 설명서</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 overflow-y-scroll">
        <Header />
        <Ments />
        <Info />
        <Separator tw="bg-gray-1300 h-3 min-h-[12px]" />
        <Faqs />
      </div>
      <ActionButton handleClick={handleClickGoSuggestForm} />
    </div>
  );
}

export default SuggestGuide;
