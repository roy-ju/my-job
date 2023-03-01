import { Radio } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from '.';

export default {
  title: 'molecules/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

export const Uncontrolled: ComponentStory<typeof RadioGroup> = () => (
  <RadioGroup defaultValue={1} tw="flex gap-2">
    <Radio value={1} />
    <Radio value={2} />
    <Radio value={3} />
  </RadioGroup>
);

export const Controlled: ComponentStory<typeof RadioGroup> = () => {
  const [value, setValue] = useState(0);
  return (
    <RadioGroup
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      tw="flex gap-2"
    >
      <Radio value={1} />
      <Radio value={2} />
      <Radio value={3} />
    </RadioGroup>
  );
};
Uncontrolled.args = {};
