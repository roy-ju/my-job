import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import RegisterMyAddress from '.';

export default {
  title: 'templates/RegisterMyAddress',
  component: RegisterMyAddress,
} as ComponentMeta<typeof RegisterMyAddress>;

export const Default: ComponentStory<typeof RegisterMyAddress> = () => (
  <Panel>
    <RegisterMyAddress />
  </Panel>
);

Default.args = {};
