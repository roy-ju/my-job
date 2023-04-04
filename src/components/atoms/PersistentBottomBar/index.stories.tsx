import type { ComponentMeta, ComponentStory } from '@storybook/react';
import PersistentBottomBar from '.';

export default {
  title: 'atoms/PersistentBottomBar',
  component: PersistentBottomBar,
} as ComponentMeta<typeof PersistentBottomBar>;

export const Default: ComponentStory<typeof PersistentBottomBar> = (args) => <PersistentBottomBar {...args} />;

Default.args = {};
