import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DanjiMarker from '.';

export default {
  title: 'organisms/map_markers/DanjiMarker',
  component: DanjiMarker,
  argTypes: {
    variant: {
      options: ['blue', 'nego'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof DanjiMarker>;

export const DanjiRealPrice: ComponentStory<typeof DanjiMarker> = (args) => <DanjiMarker {...args} />;

DanjiRealPrice.storyName = '단지/실거래가';
DanjiRealPrice.args = {
  variant: 'blue',
  area: 34,
  price: 3540000000,
  count: 0,
};

export const DanjiHoga: ComponentStory<typeof DanjiMarker> = (args) => <DanjiMarker {...args} />;

DanjiHoga.storyName = '단지/호가';
DanjiHoga.args = {
  variant: 'nego',
  area: 34,
  price: 3540000000,
  count: 0,
};

export const DanjiRealPriceWithCount: ComponentStory<typeof DanjiMarker> = (args) => <DanjiMarker {...args} />;
DanjiRealPriceWithCount.storyName = '단지/실거래가/n개';
DanjiRealPriceWithCount.args = {
  variant: 'blue',
  area: 34,
  price: 3540000000,
  count: 9,
};

export const DanjiMarkerWithPopper: ComponentStory<typeof DanjiMarker> = () => (
  <div tw="p-20 flex flex-col gap-20">
    <DanjiMarker variant="blue" area={10} price={100000000} count={10}>
      <DanjiMarker.Popper
        name="기흥더샵프라임뷰"
        householdCount={1000}
        buyListingCount={10}
        rentListingCount={10}
        suggestCount={1}
      />
    </DanjiMarker>
    <DanjiMarker variant="blue" area={10} price={100000000} count={0}>
      <DanjiMarker.Popper
        name="기흥더샵프라임뷰"
        householdCount={1000}
        buyListingCount={10}
        rentListingCount={10}
        suggestCount={1}
      />
    </DanjiMarker>
  </div>
);
