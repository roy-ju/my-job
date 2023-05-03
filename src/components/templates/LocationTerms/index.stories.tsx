import type { ComponentMeta, ComponentStory } from '@storybook/react';
import HTML_20221103 from '@/assets/terms/location_agreement/20221103';
import { Panel } from '@/components/atoms';
import LocationTerms from '.';

export default {
  title: 'templates/LocationTerms',
  component: LocationTerms,
} as ComponentMeta<typeof LocationTerms>;

export const Default: ComponentStory<typeof LocationTerms> = (args) => (
  <Panel>
    <LocationTerms {...args} />
  </Panel>
);

Default.args = {
  html: HTML_20221103,
  termDate: '2022.11.03',
};
