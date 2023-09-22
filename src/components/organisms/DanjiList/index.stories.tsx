import { Panel } from '@/components/atoms';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import DanjiList from '.';

export default {
  title: 'organisms/DanjiList',
  component: DanjiList,
} as ComponentMeta<typeof DanjiList>;

export const Default: ComponentStory<typeof DanjiList> = () => (
  <Panel>
    <DanjiList tw="h-full">
      <DanjiList.Header />
      <DanjiList.AddressSearchForm />
    </DanjiList>
  </Panel>
);

Default.args = {};
