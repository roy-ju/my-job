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

export const Default: ComponentStory<typeof Numeral> = (args) => <Numeral {...args} />;

Default.args = {
  thousandsSeparated: true,
  koreanNumber: false,
  koreanNumberShort: false,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  children: 1234,
  falsy: undefined,
  suffix: '㎡',
};

export const Examples: ComponentStory<typeof Numeral> = () => (
  <div tw="flex flex-col gap-2">
    <Numeral>999</Numeral>
    <Numeral tw="text-h1 text-nego-1000 font-bold">999</Numeral>
    <Numeral koreanNumber>10000000</Numeral>
    <Numeral thousandsSeparated koreanNumber>
      25000000
    </Numeral>
    <Numeral thousandsSeparated koreanNumber suffix="원">
      50000000
    </Numeral>
    <Numeral koreanNumberShort>550000000</Numeral>
    <Numeral koreanNumberShort falsy="-">
      I am Falsy
    </Numeral>
    <Numeral koreanNumberShort falsy="0원">
      0
    </Numeral>
  </div>
);
