import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyCouponListItem from '.';

export default {
  title: 'organisms/MyCouponListItem',
  component: MyCouponListItem,
} as ComponentMeta<typeof MyCouponListItem>;

export const Default: ComponentStory<typeof MyCouponListItem> = (args) => <MyCouponListItem {...args} />;

Default.args = {
  isExpired: false,
};
