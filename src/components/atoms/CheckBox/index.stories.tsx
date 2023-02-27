import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { CheckBox } from '.';

export default {
  title: 'atoms/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const Default: ComponentStory<typeof CheckBox> = () => (
  <CheckBox>
    <span>유형</span>
  </CheckBox>
);

Default.args = {};
