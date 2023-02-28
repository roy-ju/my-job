import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from '@/assets/icons/search.svg';

import tw from 'twin.macro';
import Input from '.';

export default {
  title: 'atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const Default: ComponentStory<typeof Input> = () => <Input />;

export const Placeholder = () => (
  <div tw="flex gap-1">
    <Input placeholder="주소 또는 단지명을 입력하세요" />
  </div>
);

export const Children = () => (
  <Input placeholder="email">
    <button type="button" tw=" w-fit bg-nego-600 p-1 rounded-lg text-white">
      Send
    </button>
  </Input>
);

export const Icon = () => (
  <Input
    placeholder="search"
    icon={<Search style={{ marginRight: '0.5rem' }} />}
  />
);

export const Disabled = () => <Input placeholder="disabled" disabled />;

export const CustomInput = () => (
  <Input
    placeholder="Custom"
    divStyle={tw`border-2 bg-nego-200 border-nego-1000`}
    inputStyle={tw`bg-nego-200 placeholder:text-2xl placeholder:text-nego-1000`}
  />
);

Default.args = {};
