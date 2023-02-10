import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Numeral from '.';

export default {
  title: 'atoms/Numeral',
  component: Numeral,
  argTypes: {
    falsy: {
      type: 'string',
    },
    children: {
      type: 'string',
    },
  },
} as ComponentMeta<typeof Numeral>;

export const Default: ComponentStory<typeof Numeral> = (args) => (
  <Numeral {...args} />
);

Default.args = {
  thousandsSeparated: true,
  koreanNumber: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  children: 1234,
  falsy: undefined,
  suffix: '㎡',
};
