import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Home from '.';

export default {
  title: 'templates/Home',
  component: Home,
} as ComponentMeta<typeof Home>;

export const Default: ComponentStory<typeof Home> = (args) => (
  <Panel>
    <Home {...args} />
  </Panel>
);

Default.args = {
  mostSuggestList: [
    {
      total_suggest_count: 1,
      danji_id: 19513,
      pnu: '1144010300101710000',
      realestate_type: 20,
      eubmyundong: '신공덕동',
      name: '마포케이씨씨웰츠타워',
      saedae_count: '122',
      jeonyong_min: '30',
      jeonyong_max: '118',
      date: '2011.05.16',
      dong_count: '1',
    },
  ],
};
