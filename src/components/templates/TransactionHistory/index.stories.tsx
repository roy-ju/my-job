import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import TransactionHistory from '.';

export default {
  title: 'templates/TransactionHistory',
  component: TransactionHistory,
} as ComponentMeta<typeof TransactionHistory>;

export const Default: ComponentStory<typeof TransactionHistory> = ({ type }) => (
  <Panel>
    <TransactionHistory type={type} />
  </Panel>
);

Default.args = {
  type: '기본',
};
