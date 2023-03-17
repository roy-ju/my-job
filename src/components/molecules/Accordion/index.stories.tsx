import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordion from '.';

export default {
  title: 'molecules/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const Default: ComponentStory<typeof Accordion> = () => (
  <Accordion>
    <Accordion.Summary tw="px-5 py-4">This is Summary</Accordion.Summary>
    <Accordion.Details tw="px-5 py-6">
      <div tw="w-full">
        THis is
        <br />
        the content
      </div>
    </Accordion.Details>
  </Accordion>
);
