import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ServiceContact from '.';

const mock = [
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
  {
    id: 1,
    contents: 'asd',
    createdTime: '2022.02.01',
    adminContents: 'asdsa',
    adminCreatedTime: '2022.03.03',
    didReply: false,
  },
];

export default {
  title: 'templates/ServiceContact',
  component: ServiceContact,
} as ComponentMeta<typeof ServiceContact>;

export const Default: ComponentStory<typeof ServiceContact> = (args) => <ServiceContact {...args} />;

Default.args = {
  list: mock,
};

export const NoItems: ComponentStory<typeof ServiceContact> = (args) => <ServiceContact {...args} />;

NoItems.args = {
  list: [],
};
