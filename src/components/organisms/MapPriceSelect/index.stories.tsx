import type { ComponentMeta, ComponentStory } from '@storybook/react';

import MapPriceSelect from './index';

export default {
  title: 'organisms/MapPriceSelect',
  component: MapPriceSelect,
} as ComponentMeta<typeof MapPriceSelect>;

export const Default: ComponentStory<typeof MapPriceSelect> = () => (
  <MapPriceSelect />
);
