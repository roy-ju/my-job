import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Radio from '.';

export default {
  title: 'atoms/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;

export const Default: ComponentStory<typeof Radio> = () => (
  <div>
    <Radio />
  </div>
);

Default.args = {};
