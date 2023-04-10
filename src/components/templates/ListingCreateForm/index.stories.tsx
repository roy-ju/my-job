import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ListingCreateForm from '.';
import { Forms } from './FormRenderer';

export default {
  title: 'templates/ListingCreateForm',
  component: ListingCreateForm,
} as ComponentMeta<typeof ListingCreateForm>;

const forms = [
  Forms.PaymentSchedules,
  Forms.SpecialTerms,
  Forms.ListingOptions,
  Forms.ExtraOptions,
  Forms.AdminFee,
  Forms.Description,
];

export const Default: ComponentStory<typeof ListingCreateForm> = () => (
  <Panel>
    <ListingCreateForm
      addressLine1="경기도 성남시 분당구 동판교로 156"
      addressLine2="삼평동, 봇들마을9단지 금호어울림 아파트 101동 101호"
      forms={forms}
    />
  </Panel>
);

Default.args = {};
