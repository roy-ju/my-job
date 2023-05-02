import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MobGlobalNavigation from '.';

export default {
  title: 'organisms/MobGlobalNavigation',
  component: MobGlobalNavigation,
} as ComponentMeta<typeof MobGlobalNavigation>;

export const Default: ComponentStory<typeof MobGlobalNavigation> = () => (
  <div tw="max-w-mobile bg-white backdrop-blur-20 pt-8 pb-8 px-8">
    <MobGlobalNavigation />
  </div>
);
