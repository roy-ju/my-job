import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import RadioButton from '.';

export default {
  title: 'atoms/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

export const Default: ComponentStory<typeof RadioButton> = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div tw="flex gap-4">
      <RadioButton
        label="연필"
        currentValue={value}
        onClick={(v: any) => setValue(v)}
      />
      <RadioButton
        label="지우개"
        currentValue={value}
        onClick={(v: any) => setValue(v)}
      />
      <RadioButton
        label="필통"
        currentValue={value}
        onClick={(v: any) => setValue(v)}
      />
    </div>
  );
};

Default.args = {};
