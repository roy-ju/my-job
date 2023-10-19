import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import React, { ReactNode } from 'react';
import IntroOne from '@/assets/icons/intro_1.svg';
import IntroTwo from '@/assets/icons/intro_2.svg';
import IntroThree from '@/assets/icons/intro_3.svg';
import IntroFour from '@/assets/icons/intro_4.svg';
import { SuggestFAQ, SuggestGuideMent, SuggestInfoment } from './constants';

type SuggestGuideProps = {
  title?: string;
  onClickBack?: () => void;
};

function SuggestGuide({ title, onClickBack }: SuggestGuideProps) {
  const IconObj: {
    [key: string]: ReactNode;
  } = {
    '1': <IntroOne />,
    '2': <IntroTwo />,
    '3': <IntroThree />,
    '4': <IntroFour />,
  };

  return (
    <div tw="flex flex-col h-full relative">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>{title}</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="flex flex-col flex-1 overflow-y-auto">
        <div tw="px-5 pt-7 pb-12">
          <p tw="text-h1">
            매물 구해요를 등록하면
            <br />
            <span tw="font-bold">이런점이 좋아요!</span>
          </p>
        </div>

        <div tw="flex flex-col gap-10 px-5">
          {SuggestGuideMent.map((item, idx) => (
            <div key={item.head} tw="flex gap-6">
              {IconObj[`${idx + 1}`]}
              <div>
                <p tw="text-b1 text-nego font-bold">{item.head}</p>
                <p tw="text-b2">{item.paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator tw="bg-gray-1300 h-3" />

        <div tw="px-5 py-10">
          <p tw="text-info">{SuggestInfoment}</p>

          <div>
            <p tw="text-h3 font-bold">자주묻는 질문</p>
          </div>

          {SuggestFAQ.map((item) => {
            console.log(item);
            return (
              <div key={item.head}>
                <p>{item.head}</p>
              </div>
            );
          })}
        </div>
      </div>

      <PersistentBottomBar>
        <Button tw="w-full pb-[34px] pt-6">다음</Button>
      </PersistentBottomBar>
    </div>
  );
}

export default SuggestGuide;
