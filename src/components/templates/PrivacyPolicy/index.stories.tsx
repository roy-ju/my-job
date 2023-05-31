import type { ComponentMeta, ComponentStory } from '@storybook/react';
import HTML_20221103 from '@/assets/terms/privacy_agreement/20221103';
import { Panel } from '@/components/atoms';
import PrivacyPolicy from '.';

export default {
  title: 'templates/PrivacyPolicy',
  component: PrivacyPolicy,
} as ComponentMeta<typeof PrivacyPolicy>;

export const Default: ComponentStory<typeof PrivacyPolicy> = (args) => (
  <Panel>
    <PrivacyPolicy {...args} />
  </Panel>
);

Default.args = {
  html: HTML_20221103,
  termDate: '2022.11.03',
};
