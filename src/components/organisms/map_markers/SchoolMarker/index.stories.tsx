import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SchoolMarker from '.';

export default {
  title: 'organisms/map_markers/SchoolMarker',
  component: SchoolMarker,
} as ComponentMeta<typeof SchoolMarker>;

export const Default: ComponentStory<typeof SchoolMarker> = () => (
  <div tw="inline-flex gap-2">
    <SchoolMarker type="elementary" name="윤슬초" />
    <SchoolMarker type="middle" name="윤중" />
    <SchoolMarker type="high" name="한국외고" onClick={() => {}} />
  </div>
);
