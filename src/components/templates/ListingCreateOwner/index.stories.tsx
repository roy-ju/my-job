import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateOwner from '.';

export default {
  title: 'templates/ListingCreateOwner',
  component: ListingCreateOwner,
} as ComponentMeta<typeof ListingCreateOwner>;

export const Default: ComponentStory<typeof ListingCreateOwner> = () => (
  <Panel>
    <ListingCreateOwner />
  </Panel>
);

Default.args = {};
