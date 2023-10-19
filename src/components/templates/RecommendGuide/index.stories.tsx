import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Panel } from '@/components/atoms';
import RecommendGuide from '.';

export default {
  title: 'templates/RecommendGuide',
  component: RecommendGuide,
} as ComponentMeta<typeof RecommendGuide>;

export const Default: ComponentStory<typeof RecommendGuide> = (args) => (
  <Panel>
    <RecommendGuide {...args} />
  </Panel>
);

Default.args = {
  title: '매물 구해요',
  onClickBack: () => {},
  onClickCTA: () => {},
};
