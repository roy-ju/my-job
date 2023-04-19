import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Tabs from '.';

export default {
  title: 'molecules/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

export const Default: ComponentStory<typeof Tabs> = () => (
  <div tw="flex flex-col gap-2">
    <Tabs>
      <Tabs.Tab value={0}>거래정보</Tabs.Tab>
      <Tabs.Tab value={1}>단지정보</Tabs.Tab>
      <Tabs.Tab value={2}>거래정보</Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
    <Tabs variant="contained">
      <Tabs.Tab value={0}>거래정보</Tabs.Tab>
      <Tabs.Tab value={1}>단지정보</Tabs.Tab>
      <Tabs.Tab value={2}>거래정보</Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
    <Tabs variant="ghost">
      <Tabs.Tab value={0}>거래정보</Tabs.Tab>
      <Tabs.Tab value={1}>단지정보</Tabs.Tab>
      <Tabs.Tab value={2}>거래정보</Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
  </div>
);
