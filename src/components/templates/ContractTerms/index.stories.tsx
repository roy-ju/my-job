import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { html } from '@/assets/terms/contract_agreement/buyer';
import { Panel } from '@/components/atoms';
import ContractTerms from '.';

export default {
  title: 'templates/ContractTerms',
  component: ContractTerms,
} as ComponentMeta<typeof ContractTerms>;

export const Default: ComponentStory<typeof ContractTerms> = (args) => (
  <Panel>
    <ContractTerms {...args} />
  </Panel>
);

Default.args = {
  html,
  type: 'buyer',
};
