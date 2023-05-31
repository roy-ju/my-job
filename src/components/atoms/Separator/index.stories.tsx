import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Separator from '.';
import Panel from '../Panel';

export default {
  title: 'atoms/Separator',
  component: Separator,
} as ComponentMeta<typeof Separator>;

export const Default: ComponentStory<typeof Separator> = () => (
  <Panel>
    <main>
      <h1>some page</h1>
      <section>
        <h2>section1</h2>
      </section>
      <Separator />
      <section>
        <h2>section2</h2>
      </section>
    </main>
  </Panel>
);
