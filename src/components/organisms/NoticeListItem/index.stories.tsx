import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NoticeListItem from '.';

export default {
  title: 'organisms/NoticeListItem',
  component: NoticeListItem,
} as ComponentMeta<typeof NoticeListItem>;

export const Default: ComponentStory<typeof NoticeListItem> = (args) => <NoticeListItem {...args} />;

export const Multiple: ComponentStory<typeof NoticeListItem> = () => (
  <div>
    <NoticeListItem
      title="[카테고리] 제목이 들어갑니다. 제목이 길 경우에는 점이 처리됩니다."
      createdTime="2022.10.11"
    />
    <NoticeListItem
      title="[카테고리] 제목이 들어갑니다. 제목이 길 경우에는 점이 처리됩니다."
      createdTime="2022.10.11"
    />
  </div>
);

Default.args = {
  title: 'hello',
  createdTime: '2022.10.11',
};
