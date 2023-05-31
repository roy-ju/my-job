import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ListingCreateResult from '.';

export default {
  title: 'templates/ListingCreateResult',
  component: ListingCreateResult,
} as ComponentMeta<typeof ListingCreateResult>;

export const Default: ComponentStory<typeof ListingCreateResult> = (args) => (
  <Panel>
    <ListingCreateResult {...args} />
  </Panel>
);

Default.args = {};
