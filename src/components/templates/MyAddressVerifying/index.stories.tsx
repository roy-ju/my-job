import { Panel } from '@/components/atoms';
import { VerifyStatus } from '@/constants/enums';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import MyAddressVerifying from '.';

export default {
  title: 'templates/MyAddressVerifying',
  component: MyAddressVerifying,
} as ComponentMeta<typeof MyAddressVerifying>;

export const Default: ComponentStory<typeof MyAddressVerifying> = (args) => (
  <Panel>
    <MyAddressVerifying {...args} />
  </Panel>
);

Default.args = { verifyStatus: VerifyStatus.None, verifyingSeconds: 30, verifyCompletedSeconds: 3 };
