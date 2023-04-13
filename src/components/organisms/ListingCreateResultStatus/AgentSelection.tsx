import { Button, Ul } from '@/components/atoms';
import { useState } from 'react';
import AgentCardCarousel, { AgentCarouselItem } from '../AgentCardCarousel';

interface Props {
  agents: AgentCarouselItem[];
  onClickNext?: (index: number) => void;
}

export default function AgentSelection({ agents, onClickNext }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div tw="px-5">
        <div tw="text-h2 font-bold">중개사를 다시 선택해 주세요.</div>
        <Ul tw="mt-2">
          <li>기존 중개사의 사정으로 선택이 초기화되었습니다.</li>
        </Ul>
      </div>
      <div tw="py-7">
        <AgentCardCarousel data={agents} index={index} onChangeIndex={(i) => setIndex(i)} />
      </div>
      <div tw="px-5">
        <Button variant="secondary" size="bigger" tw="w-full" onClick={() => onClickNext?.(index)}>
          중개사 선택하기
        </Button>
      </div>
    </div>
  );
}
