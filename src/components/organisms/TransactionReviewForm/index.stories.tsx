import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionReviewForm from '.';

export default {
  title: 'organisms/TransactionReviewForm',
  component: TransactionReviewForm,
} as ComponentMeta<typeof TransactionReviewForm>;

export const Default: ComponentStory<typeof TransactionReviewForm> = () => <TransactionReviewForm />;

Default.args = {};
