import type { ComponentMeta, ComponentStory } from '@storybook/react';
import TransactionConditionListItem from './Item';

export default {
  title: 'organisms/TransactionConditionListItem',
  component: TransactionConditionListItem,
} as ComponentMeta<typeof TransactionConditionListItem>;

export const Default: ComponentStory<typeof TransactionConditionListItem> = () => (
  <div tw="flex flex-col gap-2">
    <TransactionConditionListItem label="거래종류" value="월세" />
    <TransactionConditionListItem label="희망가" value={100_000} />
    <TransactionConditionListItem label="계약금" value={1_000_000} />
    <TransactionConditionListItem label="중도금" value={1_000_000} />
    <TransactionConditionListItem label="잔금" value={1_000_000} />
    <TransactionConditionListItem
      label="실제지급총액"
      value={20_000_000}
      value2={[
        { name: 'Jay', amount: 10_000_000 },
        { name: '조엘', amount: 10_000_000 },
      ]}
    />
    <TransactionConditionListItem
      label="선순위담보권"
      value={[
        { name: 'Jay', amount: 10_000_000 },
        { name: '조엘', amount: 10_000_000 },
      ]}
    />
    <TransactionConditionListItem label="입주가능시기" value="2022-03-03" />
    <TransactionConditionListItem label="전세자금대출" value={false} />
    <TransactionConditionListItem label="임대기간" value={2} />
    <TransactionConditionListItem label="임대할부분" value="전체" />
    <TransactionConditionListItem label="특약조건" value="특약조건으로 무엇이 들어갈 수 있을까나 아아" />
  </div>
);

Default.args = {};
