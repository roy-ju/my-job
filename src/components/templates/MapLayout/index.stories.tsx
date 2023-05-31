import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MapLayout from '.';

export default {
  title: 'templates/MapLayout',
  component: MapLayout,
} as ComponentMeta<typeof MapLayout>;

function MapPlaceholder() {
  return <div tw="w-full h-full flex items-center justify-center font-bold text-h1">MAP</div>;
}

export const PanelClosed: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels />
    <MapLayout.MapContainer showClosePanelButton={false} centerAddress={['서울특별시', '강남구', '역삼동']}>
      <MapPlaceholder />
    </MapLayout.MapContainer>
  </MapLayout>
);
PanelClosed.storyName = '0 뎁스';

export const PanelOpened: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels>
      <Panel />
    </MapLayout.Panels>
    <MapLayout.MapContainer showClosePanelButton={false} centerAddress={['서울특별시', '강남구', '역삼동']}>
      <MapPlaceholder />
    </MapLayout.MapContainer>
  </MapLayout>
);
PanelOpened.storyName = '1 뎁스';

export const TwoPanelsOpened: ComponentStory<typeof MapLayout> = (args) => (
  <MapLayout {...args}>
    <MapLayout.Panels>
      <Panel />
      <Panel />
    </MapLayout.Panels>
    <MapLayout.MapContainer showClosePanelButton centerAddress={['서울특별시', '강남구', '역삼동']}>
      <MapPlaceholder />
    </MapLayout.MapContainer>
  </MapLayout>
);
TwoPanelsOpened.storyName = '2 뎁스';
