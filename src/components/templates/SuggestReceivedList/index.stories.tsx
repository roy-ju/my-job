import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestReceivedList from '.';

export default {
  title: 'templates/SuggestReceivedList',
  component: SuggestReceivedList,
} as ComponentMeta<typeof SuggestReceivedList>;

export const Default: ComponentStory<typeof SuggestReceivedList> = () => (
  <Panel>
    <SuggestReceivedList />
  </Panel>
);

Default.args = {};
