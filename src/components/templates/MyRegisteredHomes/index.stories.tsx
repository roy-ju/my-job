import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyRegisteredHomes from '.';

export default {
  title: 'templates/MyRegisteredHomes',
  component: MyRegisteredHomes,
} as ComponentMeta<typeof MyRegisteredHomes>;

export const Default: ComponentStory<typeof MyRegisteredHomes> = (args) => (
  <Panel>
    <MyRegisteredHomes {...args} />
  </Panel>
);

Default.args = {
  list: [
    {
      id: 12,
      status: 20,
      road_name_address: '경기 성남시 분당구 분당내곡로 155',
      danji_name: '판교역 KCC웰츠타워(657-0)',
      dong: '비',
      ho: '902',
    },
    {
      id: 22,
      status: 20,
      road_name_address: '경기도 성남시 분당구 분당내곡로 155',
      danji_name: '판교역 KCC웰츠타워(657-0)',
      dong: '비',
      ho: '905',
    },
    {
      id: 23,
      status: 20,
      road_name_address: '경기도 성남시 분당구 분당내곡로 155',
      danji_name: '판교역 KCC웰츠타워(657-0)',
      dong: '비',
      ho: '904',
    },
    {
      id: 24,
      status: 16,
      road_name_address: '경기도 성남시 분당구 분당내곡로 155',
      danji_name: '판교역 KCC웰츠타워(657-0)',
      dong: '비',
      ho: '903',
    },
  ],
  onClickBack: undefined,
  onClickSendSMS: undefined,
  onClickDeleteIcon: undefined,
  onClickAddMyAddress: undefined,
};
