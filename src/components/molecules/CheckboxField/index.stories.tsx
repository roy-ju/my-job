import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { CheckboxField } from '.';

export default {
  title: 'molecules/CheckboxField',
  component: CheckboxField,
} as ComponentMeta<typeof CheckboxField>;

export const Default: ComponentStory<typeof CheckboxField> = () => (
  <CheckboxField
    title="기타"
    value={['유형1', '유형2', '유형3']}
    onChangeValue={() => {}}
  />
);

Default.args = {};

export const CheckedValue = () => {
  const [value, setValue] = useState<any[]>([]);

  return (
    <div tw="flex flex-col gap-2">
      <CheckboxField
        title="메뉴"
        value={['떡볶이', '피자']}
        onChangeValue={(i: any) => {
          setValue(i);
        }}
      />
      <div tw="flex gap-2">
        <span> 오늘의 메뉴는</span>
        {value.map((v) => (
          <span key={v}>{v}</span>
        ))}
        입니다.
      </div>
    </div>
  );
};
