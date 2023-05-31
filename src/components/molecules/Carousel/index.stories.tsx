import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Carousel from '.';

export default {
  title: 'molecules/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

function renderLeftButton(props: any) {
  return (
    <button type="button" {...props} tw="absolute top-1/2 left-0 -translate-y-1/2 bg-white z-10">
      left
    </button>
  );
}

function renderRightButton(props: any) {
  return (
    <button type="button" {...props} tw="absolute top-1/2 right-0 -translate-y-1/2 bg-white z-10">
      right
    </button>
  );
}

export const Default: ComponentStory<typeof Carousel> = () => (
  <Carousel renderLeftButton={renderLeftButton} renderRightButton={renderRightButton}>
    <div style={{ width: '200px', height: '120px', backgroundColor: 'red' }} />
    <div style={{ width: '200px', height: '120px', backgroundColor: 'blue' }} />
    <div style={{ width: '200px', height: '120px', backgroundColor: 'green' }} />
    <div style={{ width: '200px', height: '120px', backgroundColor: 'yellow' }} />
  </Carousel>
);

Default.args = {};
