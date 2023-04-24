import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRegionalSummary from '.';

export default {
  title: 'templates/SuggestRegionalSummary',
  component: SuggestRegionalSummary,
} as ComponentMeta<typeof SuggestRegionalSummary>;

export const Default: ComponentStory<typeof SuggestRegionalSummary> = () => (
  <Panel>
    <SuggestRegionalSummary />
  </Panel>
);

Default.args = {};
