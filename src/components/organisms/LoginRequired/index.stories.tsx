import type { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginRequired from '.';

export default {
  title: 'organisms/LoginRequired',
  component: LoginRequired,
} as ComponentMeta<typeof LoginRequired>;

export const Default: ComponentStory<typeof LoginRequired> = (args) => <LoginRequired {...args} />;

Default.args = {};
