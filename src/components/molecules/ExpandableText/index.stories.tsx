import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ExpandableText from '.';

export default {
  title: 'molecules/ExpandableText',
  component: ExpandableText,
} as ComponentMeta<typeof ExpandableText>;

export const Default: ComponentStory<typeof ExpandableText> = (args) => (
  <Panel>
    <ExpandableText {...args} />
  </Panel>
);

export const OverflowText: ComponentStory<typeof ExpandableText> = (args) => (
  <Panel>
    <ExpandableText {...args} />
  </Panel>
);

Default.args = {
  children: 'test를 해보겠습니다',
};

OverflowText.args = {
  children:
    'test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다test를 해보겠습니다',
};
