import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NotificationDetail from '.';

export default {
  title: 'templates/NotificationDetail',
  component: NotificationDetail,
} as ComponentMeta<typeof NotificationDetail>;

export const Default: ComponentStory<typeof NotificationDetail> = (args) => (
  <Panel>
    <NotificationDetail {...args} />
  </Panel>
);

Default.args = {
  title: '제목이 들어갑니다.',
};
