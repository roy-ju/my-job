import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Separator from '.';
import Panel from '../Panel';

export default {
  title: 'atoms/Separator',
  component: Separator,
} as ComponentMeta<typeof Separator>;

export const Default: ComponentStory<typeof Separator> = () => (
  <Panel>
    <h2>Section</h2>
    <Separator />
    <h2>Section</h2>
  </Panel>
);
