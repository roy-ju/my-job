import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapSearchInput from '.';

export default {
  title: 'organisms/MapSearchInput',
  component: MapSearchInput,
} as ComponentMeta<typeof MapSearchInput>;

export const Default: ComponentStory<typeof MapSearchInput> = () => (
  <MapSearchInput>
    <MapSearchInput.SearchInput onChange={() => {}} onClickButton={() => {}} />
    <MapSearchInput.CurrentSearch
      onClickClose={() => {}}
      onClickItem={() => {}}
    />
    <MapSearchInput.SearchList onClickItem={() => {}} />
  </MapSearchInput>
);

Default.args = {};
