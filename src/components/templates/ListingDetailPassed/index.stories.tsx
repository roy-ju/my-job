import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ListingDetailPassed from '.';

export default {
  title: 'templates/ListingDetailPassed',
  component: ListingDetailPassed,
} as ComponentMeta<typeof ListingDetailPassed>;

export const Default: ComponentStory<typeof ListingDetailPassed> = (args) => (
  <Panel>
    <ListingDetailPassed {...args} />
  </Panel>
);

Default.args = {
  contractCompletionDate: '2023-04-22T00:00:00+09:00',
  contractMonthlyRentFee: 100000,
  contractTradeOrDepositPrice: 1000000000,
  direction: '남향',
  floorDescription: '저층',
  hasReview: false,
  jeonyongArea: '30',
  listingContractId: 8,
  listingId: 2900,
  listingStatus: 22,
  listingTitle: '신갈현대아파트 102동',
  roadNameAddress: '경기 용인시 기흥구 용구대로 2242',
  sellerAgentChatRoomId: 3052,
  statusText: '거래가 성사되어 계약이 체결되었습니다.',
  thumbnailFullPath: undefined,
  totalFloor: '20',
};
