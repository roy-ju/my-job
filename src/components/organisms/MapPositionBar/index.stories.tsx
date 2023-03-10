import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapPositionBar from '.';

export default {
  title: 'organisms/MapPositionBar',
  component: MapPositionBar,
} as ComponentMeta<typeof MapPositionBar>;

export const Default: ComponentStory<typeof MapPositionBar> = () => (
  <div tw="flex gap-2">
    <MapPositionBar position1="서울특별시" />
    <MapPositionBar position1="서울특별시" position2="중구" />
    <MapPositionBar
      position1="서울특별시"
      position2="중구"
      position3="남대문로 2가"
    />
  </div>
);
