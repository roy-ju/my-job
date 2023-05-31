import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateAddressDetail from '.';

export default {
  title: 'templates/LisitngCreateAddressDetail',
  component: ListingCreateAddressDetail,
} as ComponentMeta<typeof ListingCreateAddressDetail>;

export const Default: ComponentStory<typeof ListingCreateAddressDetail> = (args) => (
  <Panel>
    <ListingCreateAddressDetail {...args} />
  </Panel>
);

Default.args = {};
