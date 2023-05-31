import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Radio from '.';
import Label from '../Label';

export default {
  title: 'atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Uncontrolled: ComponentStory<typeof Radio> = () => (
  <div>
    <Radio />
  </div>
);

export const Controlled: ComponentStory<typeof Radio> = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Radio checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    </div>
  );
};

export const WithLabel: ComponentStory<typeof Radio> = () => (
  <Label control={<Radio />} label="라디오" />
);

Uncontrolled.args = {};
