import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Panel } from '@/components/atoms';
import PageNotFound from '.';

export default {
  title: 'templates/PageNotFound',
  component: PageNotFound,
} as ComponentMeta<typeof PageNotFound>;

export const Default: ComponentStory<typeof PageNotFound> = () => (
  <Panel>
    <PageNotFound />
  </Panel>
);

Default.args = {};
