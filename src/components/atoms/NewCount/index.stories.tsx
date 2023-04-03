import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NewCount from '.';

export default {
  title: 'atoms/NewCount',
  component: NewCount,
} as ComponentMeta<typeof NewCount>;

export const Default: ComponentStory<typeof NewCount> = (args) => <NewCount {...args} />;

Default.args = {
  value: 1,
};
