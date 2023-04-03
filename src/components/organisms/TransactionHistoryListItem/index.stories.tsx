import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionHistoryListItem from '.';

export default {
  title: 'organisms/TransactionHistoryListItem',
  component: TransactionHistoryListItem,
} as ComponentMeta<typeof TransactionHistoryListItem>;

export const Default: ComponentStory<typeof TransactionHistoryListItem> = () => <TransactionHistoryListItem />;
