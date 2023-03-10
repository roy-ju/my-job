import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SchoolMarker from '.';

export default {
  title: 'organisms/map_markers/SchoolMarker',
  component: SchoolMarker,
} as ComponentMeta<typeof SchoolMarker>;

export const Default: ComponentStory<typeof SchoolMarker> = () => (
  <div tw="inline-flex gap-2">
    <SchoolMarker name="윤슬초" />
    <SchoolMarker name="윤중" />
    <SchoolMarker name="한국외고" onClick={() => {}} />
  </div>
);
