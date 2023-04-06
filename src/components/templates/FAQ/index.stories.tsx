import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import FAQ from '.';

export default {
  title: 'templates/FAQ',
  component: FAQ,
} as ComponentMeta<typeof FAQ>;

export const Default: ComponentStory<typeof FAQ> = () => (
  <Panel>
    <FAQ />
  </Panel>
);

Default.args = {};
