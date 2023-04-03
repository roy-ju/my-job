import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MobMapHeader from '.';

export default {
  title: 'organisms/MobMapHeader',
  component: MobMapHeader,
} as ComponentMeta<typeof MobMapHeader>;

export const Default: ComponentStory<typeof MobMapHeader> = (args) => <MobMapHeader {...args} />;

Default.args = {
  value: 0,
};
