import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Ul from '.';

export default {
  title: 'atoms/Ul',
  component: Ul,
} as ComponentMeta<typeof Ul>;

export const Default: ComponentStory<typeof Ul> = () => (
  <div tw="w-[380px] bg-white px-5 py-6 rounded-lg">
    <Ul>
      <li>매물등록신청, 거래 참여 등을 하기 위해서는 본인인증이 필요합니다</li>
      <li>
        휴대폰 번혼를 등록하시면 중요한 알림을 받으실 수 있습니다 휴대폰 번혼를 등록하시면 중요한 알림을 받으실 수
        있습니다
      </li>
    </Ul>
  </div>
);
