import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapFilter from '.';
import BuyorRentFilter from './BuyOrRentFilter';
import PriceFilter from './PriceFilter';
import RealestateTypeFilter from './RealestateTypeFilter';

export default {
  title: 'organisms/MapFilter',
  component: MapFilter,
} as ComponentMeta<typeof MapFilter>;

export const Default: ComponentStory<typeof MapFilter> = () => (
  <div tw="w-[380px]">
    <MapFilter />
  </div>
);

export const FilterList: ComponentStory<typeof RealestateTypeFilter> = () => (
  <div tw="flex flex-col gap-2">
    <RealestateTypeFilter realestateTypeGroup="apt,oftl" />
    <BuyorRentFilter realestateTypeGroup="apt,oftl" />
    <PriceFilter buyOrRents="1,2,3" />
  </div>
);

FilterList.storyName = '필터 목록';
