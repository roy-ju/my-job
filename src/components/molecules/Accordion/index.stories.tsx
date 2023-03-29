import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordion from '.';

export default {
  title: 'molecules/Accordion',
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

export const Default: ComponentStory<typeof Accordion> = () => (
  <Accordion>
    <Accordion.Summary tw="px-5 py-4 font-bold">네고 진행중</Accordion.Summary>
    <Accordion.Details tw="px-5 pt-1 pb-6">
      <div tw="w-full text-b2 text-gray-700">
        매물방문을 하시거나, 중개사가 허용할 경우 거래참여 (가격을 제안) 할 수 있습니다.
        <br />
        (어느 쪽이든) 가격을 수락할 때까지 네고는 시간의 제한없이 지속됩니다.
      </div>
    </Accordion.Details>
  </Accordion>
);

export const LongSummary: ComponentStory<typeof Accordion> = () => (
  <Accordion>
    <Accordion.Summary tw="px-5 py-4 font-bold">
      네고 진행중 <br /> 네고 진행중
    </Accordion.Summary>
    <Accordion.Details tw="px-5 pt-1 pb-6">
      <div tw="w-full text-b2 text-gray-700">
        매물방문을 하시거나, 중개사가 허용할 경우 거래참여 (가격을 제안) 할 수 있습니다.
        <br />
        (어느 쪽이든) 가격을 수락할 때까지 네고는 시간의 제한없이 지속됩니다.
      </div>
    </Accordion.Details>
  </Accordion>
);

export const NoArrow: ComponentStory<typeof Accordion> = () => (
  <Accordion>
    <Accordion.Summary hideArrow tw="px-5 py-4 font-bold">
      네고 진행중
    </Accordion.Summary>
    <Accordion.Details tw="px-5 pt-1 pb-6">
      <div tw="w-full text-b2 text-gray-700">
        매물방문을 하시거나, 중개사가 허용할 경우 거래참여 (가격을 제안) 할 수 있습니다.
        <br />
        (어느 쪽이든) 가격을 수락할 때까지 네고는 시간의 제한없이 지속됩니다.
      </div>
    </Accordion.Details>
  </Accordion>
);
