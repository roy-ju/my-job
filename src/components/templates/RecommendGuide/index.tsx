import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { Accordion, NavigationHeader } from '@/components/molecules';
import React, { ReactNode } from 'react';
import IntroOne from '@/assets/icons/intro_1.svg';
import IntroTwo from '@/assets/icons/intro_2.svg';
import IntroThree from '@/assets/icons/intro_3.svg';
import IntroFour from '@/assets/icons/intro_4.svg';
import tw, { styled } from 'twin.macro';
import { RecommendGuideMent, RecommendInfoment, RecommendFAQ } from './constants';

type RecommendGuideProps = {
  title?: string;
  onClickBack?: () => void;
  onClickCTA?: () => void;
};

const Conatiner = styled.div`
  & > div:not(:last-of-type) {
    ${tw`border-b border-b-gray-300`}
  }
`;

function RecommendGuide({ title, onClickBack, onClickCTA }: RecommendGuideProps) {
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
          {RecommendGuideMent.map((item, idx) => (
            <div key={item.head} tw="flex gap-6">
              {IconObj[`${idx + 1}`]}
              <div>
                <p tw="text-b1 text-nego font-bold">{item.head}</p>
                <p tw="text-b2">{item.paragraph}</p>
              </div>
            </div>
          ))}
        </div>

        <p tw="text-info text-gray-700 pb-12 px-5">{RecommendInfoment}</p>

        <Separator tw="bg-gray-1300 h-3 min-h-[12px]" />

        <div tw="pb-10 pt-10">
          <p tw="text-h3 font-bold px-5 pb-4">자주묻는 질문</p>

          <Conatiner>
            {RecommendFAQ.map((item) => (
              <Accordion key={item.head}>
                <Accordion.Summary tw="px-5 py-4 flex gap-4">
                  <p>{item.head}</p>
                </Accordion.Summary>

                <Accordion.Details tw="pb-4">
                  {item.paragraph.map((value) => (
                    <p tw="px-5 text-info break-words whitespace-pre-wrap [letter-spacing: -0.15px]" key={value}>
                      {value}
                    </p>
                  ))}
                </Accordion.Details>
              </Accordion>
            ))}
          </Conatiner>
        </div>
      </div>

      <PersistentBottomBar>
        <Button variant="secondary" tw="w-full pb-[34px] pt-6" onClick={onClickCTA}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}

export default RecommendGuide;
