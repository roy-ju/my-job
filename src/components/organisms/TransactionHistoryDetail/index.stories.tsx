import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionHistoryDetail from '.';

export default {
  title: 'organisms/TransactionHistoryDetail',
  component: TransactionHistoryDetail,
} as ComponentMeta<typeof TransactionHistoryDetail>;

export const Default: ComponentStory<typeof TransactionHistoryDetail> = () => <TransactionHistoryDetail />;

Default.args = {};
