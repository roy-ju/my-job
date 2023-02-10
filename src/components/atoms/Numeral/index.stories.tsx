import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Numeral from '.';

export default {
  title: 'atoms/Numeral',
  component: Numeral,
} as ComponentMeta<typeof Numeral>;

export const Default: ComponentStory<typeof Numeral> = (args) => (
  <div tw="text-white">
    <Numeral {...args} />
  </div>
);

Default.args = {
  thousandsSeparated: true,
  koreanNumber: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  children: 1234,
};
