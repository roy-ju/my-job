import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Qna from '.';

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
  title: 'templates/MobQna',
  component: Qna,
} as ComponentMeta<typeof Qna>;

export const Default: ComponentStory<typeof Qna> = (args) => (
  <Panel>
    <Qna {...args} />
  </Panel>
);

Default.args = {
  list: mock,
};

export const NoItems: ComponentStory<typeof Qna> = (args) => (
  <Panel>
    <Qna {...args} />
  </Panel>
);

NoItems.args = {
  list: [],
};
