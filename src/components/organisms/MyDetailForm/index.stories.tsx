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

export const AllCombiled = () => (
  <div tw="bg-white py-10">
    <MyDetailForm>
      <MyDetailForm.LoginInfo />
      <MyDetailForm.Separator />
      <MyDetailForm.IdentityInfo />
      <MyDetailForm.Separator />
      <MyDetailForm.Separator />
    </MyDetailForm>
  </div>
);
