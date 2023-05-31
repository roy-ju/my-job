import type { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from '.';

export default {
  title: 'organisms/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

export const Default: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

Default.args = {};
