import type { ComponentMeta, ComponentStory } from '@storybook/react';
import AgentCardItem from '.';

export default {
  title: 'organisms/AgentCardItem',
  component: AgentCardItem,
} as ComponentMeta<typeof AgentCardItem>;

export const Default: ComponentStory<typeof AgentCardItem> = () => (
  <AgentCardItem>
    <AgentCardItem.Profile
      officeName="네고시오"
      profileImageFullPath="https://cdn.pixabay.com/photo/2023/03/21/09/16/bird-7866804_640.jpg"
      name="김네고"
    />
    <AgentCardItem.Detail
      cellPhone="02-2222-2222"
      fullJibunAddress="경기도 성남시 분당구 백현동 645-12"
      registrationNumber="12345-8219-71734"
      description="한줄소개가 들어갑니다. 최대 50자입니다. 어디까지 가야할까요? 네고시오 화이팅 열심히"
    />
    <AgentCardItem.FoldButton />
  </AgentCardItem>
);
