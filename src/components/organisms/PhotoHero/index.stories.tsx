import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import PhotoCarouselHero from '.';

export default {
  title: 'organisms/PhotoCarouselHero',
  component: PhotoCarouselHero,
} as ComponentMeta<typeof PhotoCarouselHero>;

export const Default: ComponentStory<typeof PhotoCarouselHero> = (args) => (
  <Panel>
    <PhotoCarouselHero {...args} />
  </Panel>
);

Default.args = {};
