import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Developer from '.';

export default {
  title: 'templates/Developer',
  component: Developer,
} as ComponentMeta<typeof Developer>;

export const Default: ComponentStory<typeof Developer> = () => (
  <Panel>
    <Developer />
  </Panel>
);
