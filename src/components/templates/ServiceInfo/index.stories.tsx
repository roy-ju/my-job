import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ServiceInfo from '.';

export default {
  title: 'templates/ServiceInfo',
  component: ServiceInfo,
} as ComponentMeta<typeof ServiceInfo>;

export const Default: ComponentStory<typeof ServiceInfo> = () => (
  <Panel>
    <ServiceInfo />
  </Panel>
);

Default.args = {};
