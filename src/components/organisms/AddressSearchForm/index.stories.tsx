import type { ComponentMeta, ComponentStory } from '@storybook/react';
import AddressSearchForm from '.';

export default {
  title: 'organisms/AddressSearchForm',
  component: AddressSearchForm,
} as ComponentMeta<typeof AddressSearchForm>;

export const Default: ComponentStory<typeof AddressSearchForm> = (args) => <AddressSearchForm {...args} />;

Default.args = {
  // searchList: [1, 2],
};
