import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Checkbox from '.';
import Label from '../Label';

export default {
  title: 'atoms/CheckBox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Uncontrolled: ComponentStory<typeof Checkbox> = () => <Checkbox />;

Uncontrolled.args = {};

export const Controlled: ComponentStory<typeof Checkbox> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
      }}
    />
  );
};

Controlled.args = {};

export const WithLabel: ComponentStory<typeof Checkbox> = () => (
  <Label label="체크박스" control={<Checkbox />} />
);
