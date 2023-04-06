import type { ComponentMeta } from '@storybook/react';
import VerifyCiPopup from '.';

export default {
  title: 'organisms/popups/VerifyCiPopup',
  component: VerifyCiPopup,
} as ComponentMeta<typeof VerifyCiPopup>;

export const DuplicatedCi = () => <VerifyCiPopup.DuplicatedCi />;

export const Under19 = () => <VerifyCiPopup.Under19 />;
