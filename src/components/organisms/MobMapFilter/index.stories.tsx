import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapFilter, { getDefaultFilterAptOftl } from '.';
import RealestateTypeFilter from './RealestateTypeFilter';

export default {
  title: 'organisms/MobMapFilter',
  component: MapFilter,
} as ComponentMeta<typeof MapFilter>;

export const Uncontrolled: ComponentStory<typeof MapFilter> = () => <MapFilter />;

export const ControlledWithArgs: ComponentStory<typeof MapFilter> = (args) => <MapFilter {...args} />;

ControlledWithArgs.args = {
  filter: getDefaultFilterAptOftl(),
};

export const FilterList: ComponentStory<typeof RealestateTypeFilter> = () => <div tw="flex flex-col gap-2 pb-10" />;
