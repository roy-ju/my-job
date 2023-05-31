import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DeregisterForm from '.';

export default {
  title: 'organisms/DeregisterForm',
  component: DeregisterForm,
} as ComponentMeta<typeof DeregisterForm>;

export const Default: ComponentStory<typeof DeregisterForm> = () => <DeregisterForm />;
