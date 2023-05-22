import type { ComponentMeta } from '@storybook/react';
import DeregisterDisClaimerPopup from '.';

export default {
  title: 'organisms/popups/DeregisterDisClaimerPopup',
  component: DeregisterDisClaimerPopup,
} as ComponentMeta<typeof DeregisterDisClaimerPopup>;

export const Success = () => <DeregisterDisClaimerPopup.Success />;

export const Confirm = () => <DeregisterDisClaimerPopup.Confirm />;
