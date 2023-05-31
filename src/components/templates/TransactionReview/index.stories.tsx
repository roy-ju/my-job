import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import TransactionReview from '.';

export default {
  title: 'templates/TransactionReview',
  component: TransactionReview,
} as ComponentMeta<typeof TransactionReview>;

export const Default: ComponentStory<typeof TransactionReview> = (args) => (
  <Panel>
    <TransactionReview {...args} />
  </Panel>
);

Default.args = {
  agentName: '허니제이',
  userNickname: '허니제이',
  ratingText: '허니제이',
  recommendations: ['허니제이'],
  freeFeedback: '허니제이',
};
