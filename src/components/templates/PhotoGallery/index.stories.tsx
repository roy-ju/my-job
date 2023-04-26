import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import { DefaultListingImageLg } from '@/constants/strings';
import { RealestateType } from '@/constants/enums';
import PhotoGallery from '.';

export default {
  title: 'templates/PhotoGallery',
  component: PhotoGallery,
} as ComponentMeta<typeof PhotoGallery>;

export const Default: ComponentStory<typeof PhotoGallery> = (args) => (
  <Panel>
    <PhotoGallery {...args} />
  </Panel>
);

Default.args = {
  headerTitle: '매물 사진',
  photoPaths: [DefaultListingImageLg[RealestateType.Apartment]],
};
