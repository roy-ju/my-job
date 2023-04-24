import type { ComponentMeta, ComponentStory } from '@storybook/react';
import SuggestRequestedListNoData from '.';

export default {
  title: 'organisms/SuggestRequestedListNoData',
  component: SuggestRequestedListNoData,
} as ComponentMeta<typeof SuggestRequestedListNoData>;

export const Default: ComponentStory<typeof SuggestRequestedListNoData> = () => <SuggestRequestedListNoData />;
