import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import BusinessInfo from '.';

export default {
  title: 'templates/BusinessInfo',
  component: BusinessInfo,
} as ComponentMeta<typeof BusinessInfo>;

export const Default: ComponentStory<typeof BusinessInfo> = () => (
  <Panel>
    <BusinessInfo />
  </Panel>
);

Default.args = {};
