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
  theme: 'primary',
  size: 'default',
};

export const Theme = () => (
  <div tw="flex gap-2">
    <Button theme="primary">Primary</Button>
    <Button theme="secondary">Secondary</Button>
    <Button theme="gray">Gray</Button>
    <Button theme="outlined">Outlined</Button>
    <Button theme="ghost">Ghost</Button>
  </div>
);

export const IconButton = () => (
  <div tw="flex gap-1">
    <Button theme="outlined">
      <User />
    </Button>
    <Button theme="primary">
      <User />
    </Button>
    <Button theme="ghost">
      <User />
    </Button>
  </div>
);

export const Size = () => (
  <div tw="flex gap-1">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="big">Big</Button>
  </div>
);

export const DisabledButton = () => (
  <div tw="flex gap-1">
    <Button disabled>Disabled</Button>
    <Button theme="secondary" disabled>
      Disabled
    </Button>
    <Button theme="gray" disabled>
      Disabled
    </Button>
    <Button theme="outlined" disabled>
      Disabled
    </Button>
  </div>
);

export const LoadingButton = () => (
  <div tw="flex gap-1">
    <Button size="small" isLoading />
    <Button size="medium" isLoading theme="secondary" />
    <Button size="big" isLoading theme="gray" />
    <Button isLoading theme="outlined" />
  </div>
);

export const SelectedButton = () => (
  <div tw="flex gap-1">
    <Button isSelected>primary</Button>
    <Button isSelected theme="secondary">
      secondary
    </Button>
    <Button isSelected theme="gray">
      gray
    </Button>
    <Button isSelected theme="outlined">
      outlined
    </Button>
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
