import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ServiceContactListItem } from '.';

export default {
  title: 'organisms/ServiceContactListItem',
  component: ServiceContactListItem,
} as ComponentMeta<typeof ServiceContactListItem>;

export const WaitingForReply: ComponentStory<typeof ServiceContactListItem> = () => (
  <div tw="w-[380px]">
    <ServiceContactListItem>
      <ServiceContactListItem.User
        contents="재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다."
        createdTime="2022.01.10"
      />
    </ServiceContactListItem>
  </div>
);

export const Answered: ComponentStory<typeof ServiceContactListItem> = () => (
  <div tw="w-[380px]">
    <ServiceContactListItem>
      <ServiceContactListItem.User
        contents="재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다."
        createdTime="2022.01.10"
        didReply
      />
      <ServiceContactListItem.Admin
        contents="국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의 체결·비준에 대한 동의권을 가진다."
        createdTime="2022.10.20"
      />
    </ServiceContactListItem>
  </div>
);
