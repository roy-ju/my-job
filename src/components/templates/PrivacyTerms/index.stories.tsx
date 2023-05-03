import type { ComponentMeta, ComponentStory } from '@storybook/react';
import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';
import { Panel } from '@/components/atoms';
import PrivacyTerms from '.';

export default {
  title: 'templates/PrivacyTerms',
  component: PrivacyTerms,
} as ComponentMeta<typeof PrivacyTerms>;

export const Default: ComponentStory<typeof PrivacyTerms> = (args) => (
  <Panel>
    <PrivacyTerms {...args} />
  </Panel>
);

Default.args = {
  html: HTML_20221103,
  termDate: '2022.11.03',
};
