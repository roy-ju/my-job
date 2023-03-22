import type { ComponentMeta, ComponentStory } from '@storybook/react';
import User from '@/assets/icons/user.svg';

import Button from '.';

export default {
  title: 'atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => <Button {...args}>네고시오</Button>;

Default.args = {
  variant: 'primary',
  size: 'big',
};

export const variant = () => (
  <div tw="flex gap-2">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="gray">Gray</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

export const IconButton = () => (
  <div tw="flex gap-1">
    <Button variant="outlined">
      <User />
    </Button>
    <Button variant="primary">
      <User />
    </Button>
    <Button variant="ghost">
      <User />
    </Button>
  </div>
);

export const Size = () => (
  <div tw="flex gap-1">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="big">Big</Button>
    <Button size="bigger">Bigger</Button>
  </div>
);

export const DisabledButton = () => (
  <div tw="flex gap-1">
    <Button disabled>Disabled</Button>
    <Button variant="secondary" disabled>
      Disabled
    </Button>
    <Button variant="gray" disabled>
      Disabled
    </Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
  </div>
);

export const LoadingButton = () => (
  <div tw="flex gap-1">
    <Button size="small" isLoading />
    <Button size="medium" isLoading variant="secondary" />
    <Button size="big" isLoading variant="gray" />
    <Button isLoading variant="outlined" />
  </div>
);

export const SelectedButton = () => (
  <div tw="flex gap-1">
    <Button selected>primary</Button>
    <Button selected variant="secondary">
      secondary
    </Button>
    <Button selected variant="gray">
      gray
    </Button>
    <Button selected variant="outlined">
      outlined
    </Button>
  </div>
);

export const CustomButton = () => (
  <div tw="flex gap-1">
    <Button tw="bg-red-200">Custom Button</Button>
    <Button tw="w-40 h-20 border-4 rounded-full shadow-2xl border-nego-400">Custom Button</Button>
  </div>
);
