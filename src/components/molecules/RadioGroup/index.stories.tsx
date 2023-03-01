import { Radio } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from '.';

export default {
  title: 'atoms/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

export const Uncontrolled: ComponentStory<typeof RadioGroup> = () => (
  <div tw="flex gap-1">
    <RadioGroup defaultValue={1}>
      <Radio value={1} />
      <Radio value={2} />
      <Radio value={3} />
    </RadioGroup>
  </div>
);

export const Controlled: ComponentStory<typeof RadioGroup> = () => {
  const [value, setValue] = useState(0);
  return (
    <div tw="flex gap-1">
      <RadioGroup
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      >
        <Radio value={1} />
        <Radio value={2} />
        <Radio value={3} />
      </RadioGroup>
    </div>
  );
};
Uncontrolled.args = {};
