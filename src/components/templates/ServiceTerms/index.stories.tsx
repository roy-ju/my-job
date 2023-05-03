import type { ComponentMeta, ComponentStory } from '@storybook/react';
import HTML_20230322 from '@/assets/terms/service_agreement/20230322';
import { Panel } from '@/components/atoms';
import ServiceTerms from '.';

export default {
  title: 'templates/ServiceTerms',
  component: ServiceTerms,
} as ComponentMeta<typeof ServiceTerms>;

export const Default: ComponentStory<typeof ServiceTerms> = (args) => (
  <Panel>
    <ServiceTerms {...args} />
  </Panel>
);

Default.args = {
  html: HTML_20230322,
  termDate: '2023.03.22',
};
