import { useRouter } from 'next/router';

import { Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import { useCallback } from 'react';

import { useRouter as useCustomRouter } from '@/hooks/utils';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Header from './guide/Header';

import Ments from './guide/Ments';

import Faqs from './guide/Faqs';

import Info from './guide/Info';

type SuggestGuideProps = {
  depth?: number;
};

function SuggestGuide({ depth }: SuggestGuideProps) {
  const customRouter = useCustomRouter(depth);

  const router = useRouter();

  const { platform } = useCheckPlatform();

  const handleClickBack = useCallback(() => {
    if (platform === 'pc') {
      customRouter.popAll();
    } else {
      router.replace('/');
    }
  }, [customRouter, platform, router]);

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
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
