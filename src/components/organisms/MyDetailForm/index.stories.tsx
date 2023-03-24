import type { ComponentMeta } from '@storybook/react';
import MyDetailForm from '.';

export default {
  title: 'organisms/MyDetailForm',
  component: MyDetailForm,
} as ComponentMeta<typeof MyDetailForm>;

export function LoginInfo() {
  return <MyDetailForm.LoginInfo />;
}

export function IdentityInfo() {
  return <MyDetailForm.IdentityInfo />;
}

export function AddressInfo() {
  return <MyDetailForm.AddressInfo />;
}
