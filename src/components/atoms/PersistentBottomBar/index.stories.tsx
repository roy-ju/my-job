import type { ComponentMeta, ComponentStory } from '@storybook/react';
import PersistentBottomBar from '.';
import Button from '../Button';
import Panel from '../Panel';

export default {
  title: 'atoms/PersistentBottomBar',
  component: PersistentBottomBar,
} as ComponentMeta<typeof PersistentBottomBar>;

export const Default: ComponentStory<typeof PersistentBottomBar> = (args) => <PersistentBottomBar {...args} />;

Default.args = {};

export const withButton: ComponentStory<typeof PersistentBottomBar> = (args) => (
  <Panel>
    <div tw="h-full flex flex-col">
      <div tw="flex-1 min-h-0" />
      <PersistentBottomBar {...args}>
        <Button tw="w-full">Button</Button>
      </PersistentBottomBar>
    </div>
  </Panel>
);
