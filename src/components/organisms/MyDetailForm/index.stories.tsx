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

export function PrivacyRetentionInfo() {
  return <MyDetailForm.PrivacyRetentionInfo />;
}

export function AllCombiled() {
  return (
    <div tw="bg-white py-10">
      <MyDetailForm>
        <MyDetailForm.LoginInfo />
        <MyDetailForm.Separator />
        <MyDetailForm.IdentityInfo />
        <MyDetailForm.Separator />
        <MyDetailForm.AddressInfo />
        <MyDetailForm.Separator />
        <MyDetailForm.PrivacyRetentionInfo />
      </MyDetailForm>
    </div>
  );
}
