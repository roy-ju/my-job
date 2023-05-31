import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ListingDetailHistory from '.';

export default {
  title: 'templates/ListingDetailHistory',
  component: ListingDetailHistory,
} as ComponentMeta<typeof ListingDetailHistory>;

export const Default: ComponentStory<typeof ListingDetailHistory> = (args) => (
  <Panel>
    <ListingDetailHistory {...args} />
  </Panel>
);

Default.args = {
  direction: '남향',
  floorDescription: '저층',

  jeonyongArea: '30',

  listingId: 2900,
  listingStatus: 22,
  listingTitle: '신갈현대아파트 102동',
  roadNameAddress: '경기 용인시 기흥구 용구대로 2242',

  statusText: '거래가 성사되어 계약이 체결되었습니다.',
  thumbnailFullPath: undefined,
  totalFloor: '20',
};
