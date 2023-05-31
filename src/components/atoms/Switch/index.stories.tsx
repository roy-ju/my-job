import type { ComponentMeta, ComponentStory } from '@storybook/react';

import Switch from '.';

export default {
  title: 'atoms/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const Default: ComponentStory<typeof Switch> = () => <Switch />;
