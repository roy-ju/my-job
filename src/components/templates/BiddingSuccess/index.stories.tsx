import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import BiddingSuccess from '.';

export default {
  title: 'templates/BiddingSuccess',
  component: BiddingSuccess,
} as ComponentMeta<typeof BiddingSuccess>;

export const Default: ComponentStory<typeof BiddingSuccess> = (args) => (
  <Panel>
    <BiddingSuccess {...args} />
  </Panel>
);

Default.args = {
  canReceiveSuggest: true,
};
