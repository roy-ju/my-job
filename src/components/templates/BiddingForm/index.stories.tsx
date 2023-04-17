import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import BiddingForm from '.';
import { Forms } from './FormRenderer';

export default {
  title: 'templates/BiddingForm',
  component: BiddingForm,
} as ComponentMeta<typeof BiddingForm>;

const forms = [Forms.Price, Forms.ContractAmount, Forms.InterimAmount];

export const Default: ComponentStory<typeof BiddingForm> = () => (
  <Panel>
    <BiddingForm forms={forms} />
  </Panel>
);

Default.args = {};
