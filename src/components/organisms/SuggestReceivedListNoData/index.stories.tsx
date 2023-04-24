import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestReceivedListNoData from '.';

export default {
  title: 'organisms/SuggestReceivedListNoData',
  component: SuggestReceivedListNoData,
} as ComponentMeta<typeof SuggestReceivedListNoData>;

export const Default: ComponentStory<typeof SuggestReceivedListNoData> = () => <SuggestReceivedListNoData />;
