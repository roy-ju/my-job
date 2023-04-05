import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NoticeList from '.';

export default {
  title: 'templates/NoticeList',
  component: NoticeList,
} as ComponentMeta<typeof NoticeList>;

export const Default: ComponentStory<typeof NoticeList> = (args) => (
  <Panel>
    <NoticeList {...args} />
  </Panel>
);

Default.args = {
  notices: Array(3)
    .fill(0)
    .map((_, index) => ({
      id: index,
      title: '[카테고리] 제목이 들어갑니다. 제목이 길 경우에는 점이 처리됩니다',
      createdTime: '2022.10.10',
    })),
};
