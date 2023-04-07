import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Panel } from '@/components/atoms';
import TransactionCondition from '.';

export default {
  title: 'organisms/TransactionCondition',
  component: TransactionCondition,
} as ComponentMeta<typeof TransactionCondition>;

export const Default: ComponentStory<typeof TransactionCondition> = () => (
  <Panel>
    <TransactionCondition>
      <TransactionCondition.List>
        <TransactionCondition.Item label="거래종류" value="월세" />
        <TransactionCondition.Item label="희망가" value="3억 1,000만/100만" />
        <TransactionCondition.Section title="지급일정" hasToolTip>
          <TransactionCondition.Item label="계약금" value={1} />
          <TransactionCondition.Item label="중도금" value={1} />
          <TransactionCondition.Item label="잔금" value={1} />
          <TransactionCondition.Item label="실제지급총액" value={1} />
        </TransactionCondition.Section>
        <TransactionCondition.Section title="선순위 담보권" hasToolTip>
          <TransactionCondition.Item label="선순위담보권" value={{ name: 'Jay', amount: 1 }} />
        </TransactionCondition.Section>
        <TransactionCondition.Section title="세부정보">
          <TransactionCondition.Item label="입주가능시기" value="2022.03.03 이전" />
          <TransactionCondition.Item label="전세자금대출" value={false} />
          <TransactionCondition.Item label="임대기간" value={2} />
          <TransactionCondition.Item label="임대할부분" value="전체" />
        </TransactionCondition.Section>
        <TransactionCondition.Item label="특약조건" value="특약조건으로 무엇이 들어갈 수 있을까나 아아" />
      </TransactionCondition.List>
    </TransactionCondition>
  </Panel>
);

Default.args = {};
