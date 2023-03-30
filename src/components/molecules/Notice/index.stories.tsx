import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { Notice } from '.';

export default {
  title: 'molecules/Notice',
  component: Notice,
} as ComponentMeta<typeof Notice>;

export const Default: ComponentStory<typeof Notice> = () => (
  <Notice>
    <div tw="flex flex-col gap-4 items-center text-center">
      <Notice.Title>이러이러합니다.</Notice.Title>
      <Notice.Contents>
        이러이러해서
        <br />
        저러저러합니다.
      </Notice.Contents>
    </div>
  </Notice>
);

export const EmptyServiceContactList: ComponentStory<typeof Notice> = () => (
  <Notice>
    <div tw="flex flex-col gap-4 items-center text-center">
      <ExclamationMark />
      <Notice.Title>서비스 문의가 없습니다.</Notice.Title>
      <Notice.Contents>
        서비스 이용에 관한 궁금한 점을
        <br />
        네고시오에 직접 물어보세요.
      </Notice.Contents>
    </div>
  </Notice>
);

/*
<div tw="bg-white h-full">

      
</div>
*/
