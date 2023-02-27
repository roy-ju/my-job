import type { ComponentMeta } from '@storybook/react';
import RegionMarker from '.';

type ArgType = {
  name: string;
  variant: 'blue' | 'nego';
  danjiCount: number;
  listingCount: number;
};

export default {
  title: 'molecules/map_markers/RegionMarker',
  component: RegionMarker,
  argTypes: {
    variant: {
      options: ['blue', 'nego'],
      control: { type: 'radio' },
    },
    listingCount: { type: 'number' },
    danjiCount: { type: 'number' },
  },
} as ComponentMeta<typeof RegionMarker>;

export const DongRealPrice = (args: ArgType) => {
  const { name, variant, danjiCount, listingCount } = args;

  return (
    <RegionMarker name={name} variant={variant}>
      <RegionMarker.DanjiCount count={danjiCount} />
      <RegionMarker.Divider />
      <RegionMarker.ListingCount count={listingCount} />
    </RegionMarker>
  );
};

DongRealPrice.storyName = '동/실거래가';
DongRealPrice.args = {
  name: '논현동',
  variant: 'blue',
  listingCount: 0,
  danjiCount: 0,
};

export const DongHoga = (args: ArgType) => {
  const { name, variant, listingCount } = args;

  return (
    <RegionMarker name={name} variant={variant}>
      <RegionMarker.ListingCount count={listingCount} />
    </RegionMarker>
  );
};

DongHoga.storyName = '동/호가';
DongHoga.args = {
  name: '논현동',
  variant: 'nego',
  listingCount: 0,
  danjiCount: 0,
};
