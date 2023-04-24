import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestRequestedList from '.';

export default {
  title: 'templates/SuggestRequestedList',
  component: SuggestRequestedList,
} as ComponentMeta<typeof SuggestRequestedList>;

export const Default: ComponentStory<typeof SuggestRequestedList> = () => (
  <Panel>
    <SuggestRequestedList />
  </Panel>
);

Default.args = {};
