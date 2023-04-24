import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRegisteredListings from '.';

export default {
  title: 'templates/MyRegisteredListings',
  component: MyRegisteredListings,
} as ComponentMeta<typeof MyRegisteredListings>;

export const Default: ComponentStory<typeof MyRegisteredListings> = (args) => <MyRegisteredListings {...args} />;

Default.args = {};
