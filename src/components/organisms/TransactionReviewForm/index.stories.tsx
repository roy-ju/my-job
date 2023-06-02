import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionReviewForm from '.';

export default {
  title: 'organisms/TransactionReviewForm',
  component: TransactionReviewForm,
} as ComponentMeta<typeof TransactionReviewForm>;

export const Default: ComponentStory<typeof TransactionReviewForm> = (args) => <TransactionReviewForm {...args} />;

Default.args = {
  agentName: '제이',
  userNickname: '숀',
};
