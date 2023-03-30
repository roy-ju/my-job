import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ServiceContactListItem } from '.';

export default {
  title: 'organisms/ServiceContactListItem',
  component: ServiceContactListItem,
} as ComponentMeta<typeof ServiceContactListItem>;

export const Default: ComponentStory<typeof ServiceContactListItem> = (args) => (
  <div tw="w-[380px]">
    <ServiceContactListItem {...args}>
      <ServiceContactListItem.User />
      <ServiceContactListItem.Admin />
    </ServiceContactListItem>
  </div>
);
Default.args = {
  contents: '부패를 천하를 만천하의 능히 이상, 인도하겠다는 운다때에, 그들의 하는 우리우리 천하는 만천하의 능히 이곳에',
  createdTime: '2022.10.10',
  didReply: false,
};
