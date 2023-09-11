import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NoDataUI from '.';

export default {
  title: 'molecules/NoDataUI',
  component: NoDataUI,
} as ComponentMeta<typeof NoDataUI>;

export const Default: ComponentStory<typeof NoDataUI> = (args) => (
  <Panel>
    <NoDataUI {...args} />
  </Panel>
);

Default.args = {
  title: '구하는 글이 없습니다.',
  body: '구하기 글을 작성하고 원하는 곳의 매물을 추천받아보세요.',
  buttonText: '새로운 매물 구하기',
};
