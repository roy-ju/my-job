import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import Information from '.';

export default {
  title: 'molecules/Information',
  component: Information,
} as ComponentMeta<typeof Information>;

export const Default: ComponentStory<typeof Information> = () => (
  <Information>
    <div tw="flex flex-col gap-4 items-center text-center">
      <Information.Title>이러이러합니다.</Information.Title>
      <Information.Contents>
        이러이러해서
        <br />
        저러저러합니다.
      </Information.Contents>
    </div>
  </Information>
);

export const EmptyQnaList: ComponentStory<typeof Information> = () => (
  <Information>
    <div tw="flex flex-col gap-4 items-center text-center">
      <ExclamationMark />
      <Information.Title>서비스 문의가 없습니다.</Information.Title>
      <Information.Contents>
        서비스 이용에 관한 궁금한 점을
        <br />
        네고시오에 직접 물어보세요.
      </Information.Contents>
    </div>
  </Information>
);
