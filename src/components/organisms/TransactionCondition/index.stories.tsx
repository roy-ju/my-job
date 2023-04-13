import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Panel } from '@/components/atoms';
import TransactionCondition from '.';

export default {
  title: 'organisms/TransactionCondition',
  component: TransactionCondition,
} as ComponentMeta<typeof TransactionCondition>;

const mockProps = {
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

export const Default: ComponentStory<typeof TransactionCondition> = () => (
  <Panel>
    <TransactionCondition>
      <TransactionCondition.List>
        <TransactionCondition.Item label="거래종류" {...mockProps} />
        <TransactionCondition.Item label="희망가" {...mockProps} />
        <TransactionCondition.Section title="지급일정" hasToolTip>
          <TransactionCondition.Item label="계약금" {...mockProps} />
          <TransactionCondition.Item label="중도금" {...mockProps} />
          <TransactionCondition.Item label="잔금" {...mockProps} />
          <TransactionCondition.Item label="실제지급총액" {...mockProps} />
        </TransactionCondition.Section>
        <TransactionCondition.Section title="선순위 담보권" hasToolTip>
          <TransactionCondition.Item label="선순위담보권" {...mockProps} />
        </TransactionCondition.Section>
        <TransactionCondition.Section title="세부정보">
          <TransactionCondition.Item label="입주가능시기" {...mockProps} />
          <TransactionCondition.Item label="전세자금대출" {...mockProps} />
          <TransactionCondition.Item label="임대기간" {...mockProps} />
          <TransactionCondition.Item label="임대할부분" {...mockProps} />
        </TransactionCondition.Section>
        <TransactionCondition.Item label="특약조건" {...mockProps} />
      </TransactionCondition.List>
    </TransactionCondition>
  </Panel>
);

Default.args = {};
