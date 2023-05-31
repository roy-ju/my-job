import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import TransactionHistory from '.';

export default {
  title: 'templates/MobTransactionHistory',
  component: TransactionHistory,
} as ComponentMeta<typeof TransactionHistory>;

export const Default: ComponentStory<typeof TransactionHistory> = (args) => (
  <Panel>
    <TransactionHistory {...args} />
  </Panel>
);

Default.args = {
  list: [],
};
