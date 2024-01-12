import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ServiceInfoList from '.';

export default {
  title: 'organisms/ServiceInfoList',
  component: ServiceInfoList,
} as ComponentMeta<typeof ServiceInfoList>;

export const Default: ComponentStory<typeof ServiceInfoList> = () => (
  <ServiceInfoList>
    <ServiceInfoList.Item title="약관 및 정책" />
    <ServiceInfoList.Item title="오픈소스 라이센스" />
    <ServiceInfoList.Item title="버전정보" />
    <ServiceInfoList.Item title="사업자정보" />
  </ServiceInfoList>
);

Default.args = {};
