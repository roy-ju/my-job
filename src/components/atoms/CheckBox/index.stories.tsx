import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Checkbox } from '.';

export default {
  title: 'atoms/CheckBox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = () => (
  <Checkbox text="유형" onChange={() => {}} />
);

Default.args = {};
