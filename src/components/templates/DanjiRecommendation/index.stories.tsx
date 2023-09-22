import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import DanjiRecommendation from '.';
import { Forms } from './FormRenderer';

export default {
  title: 'templates/DanjiRecommendation',
  component: DanjiRecommendation,
} as ComponentMeta<typeof DanjiRecommendation>;

export const Default: ComponentStory<typeof DanjiRecommendation> = (args) => (
  <Panel>
    <DanjiRecommendation {...args} />
  </Panel>
);

Default.args = {
  forms: [...Object.values(Forms)],
};
