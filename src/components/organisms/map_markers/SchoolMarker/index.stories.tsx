import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SchoolMarker from '.';

export default {
  title: 'organisms/map_markers/SchoolMarker',
  component: SchoolMarker,
} as ComponentMeta<typeof SchoolMarker>;

export const Default: ComponentStory<typeof SchoolMarker> = () => (
  <div tw="inline-flex gap-2">
    <SchoolMarker type={0} name="윤슬초" />
    <SchoolMarker type={1} name="윤중" />
    <SchoolMarker type={2} name="한국외고" onClick={() => {}} />
  </div>
);
