import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import Qna from '.';

const mock = [
  {
    admin_message:
      '어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다어드민메세지입니다',
    admin_response_time: '2023-05-04T11:01:30+09:00',
    created_time: '2023-05-04T11:01:30+09:00',
    id: 0,
    user_id: 0,
    user_message: '유저메시지입니다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
  },
  {
    admin_message: '',
    admin_response_time: '',
    created_time: '2023-05-04T11:01:30+09:00',
    id: 1,
    user_id: 1,
    user_message: '유저메세지유저메시지입니다!!!!',
  },
];

export default {
  title: 'templates/Qna',
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
