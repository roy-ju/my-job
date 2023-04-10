import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateChooseAgent from '.';

export default {
  title: 'templates/ListingCreateChooseAgent',
  component: ListingCreateChooseAgent,
} as ComponentMeta<typeof ListingCreateChooseAgent>;

export const Default: ComponentStory<typeof ListingCreateChooseAgent> = () => (
  <Panel>
    <ListingCreateChooseAgent />
  </Panel>
);

Default.args = {};
