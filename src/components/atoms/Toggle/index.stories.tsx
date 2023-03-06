import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Toggle from '.';
import Label from '../Label';

export default {
  title: 'atoms/Toggle',
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

export const Uncontrolled: ComponentStory<typeof Toggle> = () => <Toggle />;

Uncontrolled.args = {};

export const Controlled: ComponentStory<typeof Toggle> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
      }}
    />
  );
};

Controlled.args = {};

export const WithLabel: ComponentStory<typeof Toggle> = () => (
  <Label label="체크박스" control={<Toggle />} />
);
