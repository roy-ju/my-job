import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapFilter, { getDefaultFilterAptOftl } from '.';
import BuyorRentFilter from './BuyOrRentFilter';
import EtcFilter from './EtcFilter';
import HouseholdFilter from './HouseholdFilter';
import PriceFilter from './PriceFilter';
import RealestateTypeFilter from './RealestateTypeFilter';

export default {
  title: 'organisms/MapFilter',
  component: MapFilter,
} as ComponentMeta<typeof MapFilter>;

export const Uncontrolled: ComponentStory<typeof MapFilter> = () => <MapFilter />;

export const ControlledWithArgs: ComponentStory<typeof MapFilter> = (args) => <MapFilter {...args} />;

ControlledWithArgs.args = {
  filter: getDefaultFilterAptOftl(),
};

export const FilterList: ComponentStory<typeof RealestateTypeFilter> = () => (
  <div tw="flex flex-col gap-2 pb-10">
    <div tw="px-4 bg-white">
      <RealestateTypeFilter realestateTypeGroup="apt,oftl" />
    </div>
    <div tw="px-4 bg-white">
      <RealestateTypeFilter realestateTypeGroup="villa,dandok" />
    </div>
    <div tw="px-4 bg-white">
      <BuyorRentFilter realestateTypeGroup="villa,dandok" />
    </div>
    <div tw="px-4 bg-white">
      <PriceFilter buyOrRents="1,2,3" />
    </div>
    <div tw="px-4 bg-white">
      <HouseholdFilter />
    </div>
    <div tw="px-4 bg-white">
      <EtcFilter />
    </div>
  </div>
);

FilterList.storyName = '필터 목록';
