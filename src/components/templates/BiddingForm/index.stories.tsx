import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import BiddingForm from '.';

export default {
  title: 'templates/BiddingForm',
  component: BiddingForm,
} as ComponentMeta<typeof BiddingForm>;

export const Default: ComponentStory<typeof BiddingForm> = () => (
  <Panel>
    <BiddingForm />
  </Panel>
);

Default.args = {};
