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

  tradePrice: 100000000,
  deposit: 0,
  monthlyRentFee: 0,
  contractAmount: 10000000,
  remainingAmount: 1000000,
  interimAmount1: 100000,
  interimAmount2: 100000,
  interimAmount3: 100000,
  debtSuccessions: [
    {
      name: '보증금',
      amount: 10000000,
    },
  ],
  collaterals: [
    {
      name: '보증금',
      amount: 10000000,
    },
  ],
  rentTermYear: 2,
  rentTermMonth: 4,
  specialTerms: 'kekdoqpwkdpowqkdpoqwkdpo',
};
