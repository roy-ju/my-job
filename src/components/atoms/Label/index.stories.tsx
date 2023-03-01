import { RadioGroup } from '@/components/molecules';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Label from '.';
import Radio from '../Radio';

export default {
  title: 'atoms/Label',
  component: Label,
} as ComponentMeta<typeof Label>;

export const SingleRadio: ComponentStory<typeof Label> = (args) => (
  <Label {...args} control={<Radio />} />
);

SingleRadio.args = {
  label: 'Label',
  labelPlacement: 'end',
};

export const MultipleRadios: ComponentStory<typeof Label> = () => (
  <RadioGroup defaultValue={0} tw="flex gap-2">
    <Label control={<Radio />} label="떡볶이" value={0} />
    <Label control={<Radio />} label="라면" value={1} />
    <Label control={<Radio />} label="치킨" value={2} />
  </RadioGroup>
);

export const CustomLabels: ComponentStory<typeof Label> = () => (
  <RadioGroup defaultValue={0} tw="flex gap-2">
    <Label
      control={<Radio />}
      label={<span tw="text-red-500">떡볶이</span>}
      value={0}
    />
    <Label
      control={<Radio />}
      label={<span tw="text-red-500">라면</span>}
      value={1}
    />
    <Label
      control={<Radio />}
      label={<span tw="text-red-500">치킨</span>}
      value={2}
    />
  </RadioGroup>
);
