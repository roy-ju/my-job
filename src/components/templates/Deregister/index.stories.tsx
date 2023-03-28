import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Deregister from '.';

export default {
  title: 'templates/Deregister',
  component: Deregister,
} as ComponentMeta<typeof Deregister>;

export const Default: ComponentStory<typeof Deregister> = () => (
  <Panel>
    <Deregister />
  </Panel>
);
