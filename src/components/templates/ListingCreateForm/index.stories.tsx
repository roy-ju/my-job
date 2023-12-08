import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateForm from '.';
import { Forms } from './FormRenderer';

export default {
  title: 'templates/ListingCreateForm',
  component: ListingCreateForm,
} as ComponentMeta<typeof ListingCreateForm>;

export const Default: ComponentStory<typeof ListingCreateForm> = (args) => (
  <Panel>
    <ListingCreateForm {...args} />
  </Panel>
);

Default.args = {
  debtSuccessionMiscs: [
    {
      key: '1',
    },
    {
      key: '2',
    },
  ],

  collaterals: [{ key: '1' }],

  forms: [Forms.DebtSuccessions, Forms.Collaterals],
};
