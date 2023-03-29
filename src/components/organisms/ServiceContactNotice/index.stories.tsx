import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ExclamationMark from '@/assets/icons/exclamation_mark.svg';
import { ServiceContactNotice } from '.';

export default {
  title: 'organisms/ServiceContactNotice',
  component: ServiceContactNotice,
} as ComponentMeta<typeof ServiceContactNotice>;

export const Default: ComponentStory<typeof ServiceContactNotice> = () => (
  <ServiceContactNotice>
    <div tw="flex flex-col gap-4 items-center text-center">
      <ExclamationMark />
      <ServiceContactNotice.Title>서비스 문의가 없습니다.</ServiceContactNotice.Title>
      <ServiceContactNotice.Contents>
        서비스 이용에 관한 궁금한 점을
        <br />
        네고시오에 직접 물어보세요.
      </ServiceContactNotice.Contents>
    </div>
  </ServiceContactNotice>
);
