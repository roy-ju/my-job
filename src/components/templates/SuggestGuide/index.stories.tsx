import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Panel } from '@/components/atoms';
import SuggestGuide from '.';

export default {
  title: 'templates/SuggestGuide',
  component: SuggestGuide,
} as ComponentMeta<typeof SuggestGuide>;

export const Default: ComponentStory<typeof SuggestGuide> = (args) => (
  <Panel>
    <SuggestGuide {...args} />
  </Panel>
);

Default.args = {
  title: '매물 구해요',
  onClickBack: () => {},
};
