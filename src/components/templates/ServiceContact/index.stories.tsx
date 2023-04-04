import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ServiceContact from '.';

const mock = [
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 0,
    user_id: 0,
    user_message: 'string',
  },
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 1,
    user_id: 1,
    user_message: 'string',
  },
  {
    admin_message: 'string',
    admin_response_time: 'string',
    created_time: 'string',
    id: 2,
    user_id: 2,
    user_message: 'string',
  },
];

export default {
  title: 'templates/ServiceContact',
  component: ServiceContact,
} as ComponentMeta<typeof ServiceContact>;

export const Default: ComponentStory<typeof ServiceContact> = (args) => (
  <Panel>
    <ServiceContact {...args} />
  </Panel>
);

Default.args = {
  list: mock,
};

export const NoItems: ComponentStory<typeof ServiceContact> = (args) => (
  <Panel>
    <ServiceContact {...args} />
  </Panel>
);

NoItems.args = {
  list: [],
};
