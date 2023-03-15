import type { ComponentMeta, ComponentStory } from '@storybook/react';
import ClosablePanel from './index';

export default {
  title: 'molecules/ClosablePanel',
  component: ClosablePanel,
} as ComponentMeta<typeof ClosablePanel>;

export const Default: ComponentStory<typeof ClosablePanel> = (args) => <ClosablePanel {...args} />;

Default.args = {
  width: '375px',
  closable: true,
};
