import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import ServiceContact from '.';

const mock = [
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: '',
    adminCreatedTime: '',
    didReply: false,
  },
  {
    id: 2,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: true,
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
