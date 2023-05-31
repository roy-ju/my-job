import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyAddress from '.';

export default {
  title: 'templates/MyAddress',
  component: MyAddress,
} as ComponentMeta<typeof MyAddress>;

export const Default: ComponentStory<typeof MyAddress> = () => (
  <Panel>
    <MyAddress />
  </Panel>
);

Default.args = {};
