import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ServiceContactFooter } from '.';

export default {
  title: 'organisms/ServiceContactFooter',
  component: ServiceContactFooter,
} as ComponentMeta<typeof ServiceContactFooter>;

export const Default: ComponentStory<typeof ServiceContactFooter> = () => <ServiceContactFooter />;
