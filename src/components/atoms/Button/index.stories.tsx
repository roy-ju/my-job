import type { ComponentMeta, ComponentStory } from '@storybook/react';
import User from '@/assets/icons/user.svg';
import tw from 'twin.macro';

import { Button } from '.';

export default {
  title: 'atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

Default.args = {
  theme: 'default',
};

export const Theme = () => (
  <div tw="flex gap-1">
    <Button theme="outlined">Outlined Button</Button>
    <Button theme="ghost">Ghost Button</Button>
  </div>
);

export const IconButton = () => (
  <div tw="flex gap-1">
    <Button theme="outlined">
      <User />
    </Button>
    <Button theme="default">
      <User />
    </Button>
    <Button theme="ghost">
      <User />
    </Button>
  </div>
);

export const Size = () => (
  <div tw="flex gap-1">
    <Button size="small">Small Button</Button>
    <Button size="big">Big Button</Button>
  </div>
);

export const DisabledButton = () => (
  <div tw="flex gap-1">
    <Button disabled>Disabled Button</Button>
  </div>
);

export const CustomButton = () => (
  <div tw="flex gap-1">
    <Button custom={tw`bg-red-200`}>Custom Button</Button>
    <Button
      custom={tw`w-40 h-20 border-4 rounded-full shadow-2xl border-nego-400`}
    >
      Custom Button
    </Button>
  </div>
);
