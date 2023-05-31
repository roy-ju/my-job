import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';
import ListingTargetPriceUpdate from '.';

export default {
  title: 'templates/ListingTargetPriceUpdate',
  component: ListingTargetPriceUpdate,
} as ComponentMeta<typeof ListingTargetPriceUpdate>;

export const Default: ComponentStory<typeof ListingTargetPriceUpdate> = (args) => (
  <Panel>
    <ListingTargetPriceUpdate {...args} />
  </Panel>
);

Default.args = {
  listingTitle: '펜트라우스 104동',
  address: '도로명주소',
  area: '44',
  floorDescription: '저',
  floor: '22',
  direction: '남향',

  listingBuyOrRent: BuyOrRent.Wolsae,
  listingPrice: 100000000,

  highestPrice: 10000000,
};
