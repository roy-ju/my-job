import type { ComponentMeta } from '@storybook/react';
import RegisterForm from '.';

export default {
  title: 'organisms/RegisterForm',
  component: RegisterForm,
} as ComponentMeta<typeof RegisterForm>;

export const Email = () => <RegisterForm.Email />;

export const Nickname = () => <RegisterForm.Nickname />;

export const PrivacyRetention = () => <RegisterForm.PrivacyRetention />;

export const Terms = () => <RegisterForm.Terms />;
