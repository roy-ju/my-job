import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NavigationHeader from './index';

export default {
  title: 'molecules/NavigationHeader',
  component: NavigationHeader,
} as ComponentMeta<typeof NavigationHeader>;

export const Default: ComponentStory<typeof NavigationHeader> = () => (
  <NavigationHeader>
    <NavigationHeader.BackButton />
    <NavigationHeader.Title>서울특별시 강남구 역삼동</NavigationHeader.Title>
  </NavigationHeader>
);
