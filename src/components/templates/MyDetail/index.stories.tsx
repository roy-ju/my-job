import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyDetail from '.';

export default {
  title: 'templates/MyDetail',
  component: MyDetail,
} as ComponentMeta<typeof MyDetail>;

export const Default: ComponentStory<typeof MyDetail> = () => (
  <Panel>
    <MyDetail />
  </Panel>
);

Default.args = {
  isLoading: false,
};
