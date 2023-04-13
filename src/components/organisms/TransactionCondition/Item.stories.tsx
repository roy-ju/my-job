import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionConditionListItem from './Item';

export default {
  title: 'organisms/TransactionConditionListItem',
  component: TransactionConditionListItem,
} as ComponentMeta<typeof TransactionConditionListItem>;

export const Default: ComponentStory<typeof TransactionConditionListItem> = (args) => (
  <div tw="flex flex-col gap-2">
    <TransactionConditionListItem label="거래종류" {...args} />
    <TransactionConditionListItem label="희망가" {...args} />
    <TransactionConditionListItem label="계약금" {...args} />
    <TransactionConditionListItem label="중도금" {...args} />
    <TransactionConditionListItem label="잔금" {...args} />
    <TransactionConditionListItem label="실제지급총액" {...args} />
    <TransactionConditionListItem label="선순위담보권" {...args} />
    <TransactionConditionListItem label="입주가능시기" {...args} />
    <TransactionConditionListItem label="전세자금대출" {...args} />
    <TransactionConditionListItem label="임대기간" {...args} />
    <TransactionConditionListItem label="임대할부분" {...args} />
    <TransactionConditionListItem label="특약조건" {...args} />
  </div>
);

Default.args = {
  buyOrRent: 1,
  deposit: 1_000_000,
  contractAmount: 1_000_000,
  monthlyRentFee: 100_000,
  remainingAmount: 1_000_000,
  interimAmount1: 1_000_000,
  interimAmount2: 1_000_000,
  interimAmount3: 1_000_000,
  interimAmountNegotiable1: false,
  interimAmountPaymentTime: '2011-10-05T14:48:00.000Z',
  interimAmountPaymentTimeType: 1,
  collaterals: [
    { name: 'Jay', amount: 10_000_000 },
    { name: '조엘', amount: 10_000_000 },
  ],
  debtSuccessions: [
    { name: 'Jay', amount: 10_000_000 },
    { name: '조엘', amount: 10_000_000 },
  ],
  moveInDate: '2011-10-05T14:48:00.000Z',
  moveInDateType: 1,
  rentTermYear: 1,
  rentTermMonth: 1,
  rentArea: '전체',
  specialTerms:
    'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇssssssssss 스토리북 작성은 너무 즐거워. 네고시오 화이팅!',
  jeonsaeLoan: true,
};
