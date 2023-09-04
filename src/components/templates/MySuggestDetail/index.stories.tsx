import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import SuggestDetail from '.';

export default {
  title: 'templates/SuggestDetail',
  component: SuggestDetail,
} as ComponentMeta<typeof SuggestDetail>;

export const Default: ComponentStory<typeof SuggestDetail> = () => (
  <Panel>
    <SuggestDetail />
  </Panel>
);

Default.args = {};
