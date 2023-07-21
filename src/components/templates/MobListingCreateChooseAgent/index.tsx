import { Button, Loading, Ul } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardCarousel } from '@/components/organisms';
import { AgentCarouselItem } from '@/components/organisms/AgentCardCarousel';

interface Props {
  isLoading?: boolean;
  agents: AgentCarouselItem[];
  index?: number;
  onClickNext?: () => void;
  onClickBack?: () => void;
  onChangeIndex?: (index: number) => void;
}

export default function MobListingCreateChooseAgent({
  isLoading,
  agents,
  index,
  onClickNext,
  onClickBack,
  onChangeIndex,
}: Props) {
  return (
    <div tw="relative w-full max-w-mobile h-full overflow-y-auto bg-white mx-auto">
      <div>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={onClickBack} />
          <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
        </NavigationHeader>
        <div tw="px-5 pt-6 mb-7">
          <div tw="text-b1 font-bold leading-none mb-3">중개사 선택</div>
          <Ul>
            <li>매물등록 신청 이후, 담당 중개사 변경은 네고시오 문의를 통해서만 가능하니 신중하게 선택해 주세요.</li>
          </Ul>
        </div>
        {!isLoading && agents.length > 0 && (
          <AgentCardCarousel data={agents} index={index} onChangeIndex={onChangeIndex} />
        )}
        {isLoading && (
          <div tw="py-10">
            <Loading />
          </div>
        )}
        <div tw="mt-10 px-5">
          <Button size="bigger" tw="w-full" onClick={onClickNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}