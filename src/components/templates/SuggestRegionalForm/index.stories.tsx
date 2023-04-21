import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRegionalForm from '.';
import { Forms } from './FormRenderer';

export default {
  title: 'templates/SuggestRegionalForm',
  component: SuggestRegionalForm,
} as ComponentMeta<typeof SuggestRegionalForm>;

export const Default: ComponentStory<typeof SuggestRegionalForm> = (args) => (
  <Panel>
    <SuggestRegionalForm {...args} />
  </Panel>
);

Default.args = {
  forms: [...Object.values(Forms)],
};
