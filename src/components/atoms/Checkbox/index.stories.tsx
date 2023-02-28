import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from '.';

export default {
  title: 'atoms/CheckBox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export const Default: ComponentStory<typeof Checkbox> = () => {
  const [selectedValue, setSelectedValue] = useState<any[]>([]);

  function onClickCheckbox(v: any) {
    let arr: any[] = [...selectedValue];
    if (selectedValue.indexOf(v) === -1) {
      arr.push(v);
    } else {
      arr = arr.filter((i) => v !== i);
    }
    setSelectedValue(arr);
  }

  return (
    <div>
      <Checkbox
        value="유형1"
        currentValue={selectedValue}
        onClick={(v: any) => onClickCheckbox(v)}
      />
      <Checkbox
        value="유형2"
        currentValue={selectedValue}
        onClick={(v: any) => onClickCheckbox(v)}
      />
      <Checkbox
        value="유형3"
        currentValue={selectedValue}
        onClick={(v: any) => onClickCheckbox(v)}
      />
    </div>
  );
};

Default.args = {};
