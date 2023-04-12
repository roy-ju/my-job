import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateSummary from '.';

export default {
  title: 'templates/ListingCreateSummary',
  component: ListingCreateSummary,
} as ComponentMeta<typeof ListingCreateSummary>;

export const Default: ComponentStory<typeof ListingCreateSummary> = (args) => (
  <Panel>
    <ListingCreateSummary {...args} />
  </Panel>
);

Default.args = {
  agentOfficeName: '네고시오',
  agentProfileImageFullPath: 'https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg',
  agentName: '김네고',
  agentCellPhone: '02-2222-2222',
  agentJibunAddress: '경기도 성남시 분당구 백현동 645-12',
  agentRegistrationNumber: '12345-8219-71734',
  agentDescription: '한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히',

  tradePrice: 100_000_000,
  deposit: 200_000_000,
  monthlyRentFee: 10_000,
  contractAmount: 10_000_000,
  remainingAmount: 1_000_000,
  interimAmount1: 100_000,
  interimAmount2: 100_000,
  interimAmount3: 100_000,
  debtSuccessions: [
    {
      name: '보증금',
      amount: 10_000_000,
    },
  ],
  collaterals: [
    {
      name: '보증금',
      amount: 10_000_000,
    },
    {
      name: '계약금',
      amount: 10_000_000_000,
    },
  ],
  moveInDate: '2023-01-02',
  rentTermYear: 2,
  rentTermMonth: 4,
  specialTerms: 'kekdoqpwkdpowqkdpoqwkdpossssssssss ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇ ㅁㄴㅇ ',
  rentArea: '전체',
};
