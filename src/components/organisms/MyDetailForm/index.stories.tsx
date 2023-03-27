import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyDetailForm from '.';

export default {
  title: 'organisms/MyDetailForm',
  component: MyDetailForm,
} as ComponentMeta<typeof MyDetailForm>;

export const LoginInfo: ComponentStory<typeof MyDetailForm.LoginInfo> = (args) => <MyDetailForm.LoginInfo {...args} />;

LoginInfo.args = {
  nickname: '김네고',
  email: 'joel.kim@negocio.co.kr',
};

export const IdentityInfo: ComponentStory<typeof MyDetailForm.IdentityInfo> = (args) => (
  <MyDetailForm.IdentityInfo {...args} />
);

IdentityInfo.args = {
  name: '김네고',
  phone: '01051177554',
};

export const AddressInfo: ComponentStory<typeof MyDetailForm.AddressInfo> = (args) => (
  <MyDetailForm.AddressInfo {...args} />
);

AddressInfo.args = {
  address: '경기도 용인시 기흥구 신갈동',
  addressDetail: '817-13',
  verified: true,
};

export const PrivacyRetentionInfo: ComponentStory<typeof MyDetailForm.PrivacyRetentionInfo> = () => (
  <MyDetailForm.PrivacyRetentionInfo />
);

export const AllCombiled = () => (
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
