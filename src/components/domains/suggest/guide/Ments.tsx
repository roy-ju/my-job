import { ReactNode } from 'react';

import IntroOne from '@/assets/icons/intro_1.svg';

import IntroTwo from '@/assets/icons/intro_2.svg';

import IntroThree from '@/assets/icons/intro_3.svg';

import IntroFour from '@/assets/icons/intro_4.svg';

import { MENT } from './constants/guide_ments';

export default function Ments() {
  const IconObj: {
    [key: string]: ReactNode;
  } = {
    '1': <IntroOne tw="w-[72px]" />,
    '2': <IntroTwo tw="w-[72px]" />,
    '3': <IntroThree tw="w-[72px]" />,
    '4': <IntroFour tw="w-[72px]" />,
  };

  return (
    <div tw="flex flex-col gap-10 px-5 pr-4">
      {MENT.map((item, idx) => (
        <div key={item.head} tw="flex gap-6">
          {IconObj[`${idx + 1}`]}
          <div tw="flex-1">
            <p tw="text-b1 text-nego font-bold">{item.head}</p>
            <p tw="text-b2">{item.paragraph}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
