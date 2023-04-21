import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRegionalForm from '.';

export default {
  title: 'templates/SuggestRegionalForm',
  component: SuggestRegionalForm,
} as ComponentMeta<typeof SuggestRegionalForm>;

export const Default: ComponentStory<typeof SuggestRegionalForm> = () => (
  <Panel>
    <SuggestRegionalForm />
  </Panel>
);

Default.args = {};
