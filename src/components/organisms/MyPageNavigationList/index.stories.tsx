import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyPageNavigationList from '.';

export default {
  title: 'organisms/MyPageNavigationList',
  component: MyPageNavigationList,
} as ComponentMeta<typeof MyPageNavigationList>;

export const Default: ComponentStory<typeof MyPageNavigationList> = () => (
  <MyPageNavigationList>
    <MyPageNavigationList.Item title="관심실거래가 현황" />
    <MyPageNavigationList.Item title="거래참여 이력" />
    <MyPageNavigationList.Item title="네고시오 소개" />
    <MyPageNavigationList.Item title="공지사항" />
    <MyPageNavigationList.Item title="자주 묻는 질문" />
    <MyPageNavigationList.Item title="서비스 문의" />
    <MyPageNavigationList.Item title="서비스 정보" />
  </MyPageNavigationList>
);
