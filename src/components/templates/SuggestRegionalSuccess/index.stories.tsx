import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRegionalSuccess from '.';

export default {
  title: 'templates/SuggestRegionalSuccess',
  component: SuggestRegionalSuccess,
} as ComponentMeta<typeof SuggestRegionalSuccess>;

export const Default: ComponentStory<typeof SuggestRegionalSuccess> = () => (
  <Panel>
    <SuggestRegionalSuccess />
  </Panel>
);

Default.args = {};
