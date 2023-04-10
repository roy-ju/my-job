import { Button, Ul } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { AgentCardCarousel } from '@/components/organisms';

interface Props {
  agents: {
    officeName: string;
    profileImageFullPath: string;
    name: string;
    cellPhone: string;
    fullJibunAddress: string;
    registrationNumber: string;
    description: string;
  }[];
}

export default function ListingCreateChooseAgent({ agents }: Props) {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 pt-6 mb-7">
        <div tw="text-b1 font-bold leading-none mb-3">중개사 선택</div>
        <Ul>
          <li>매물등록 신청 이후, 담당 중개사 변경은 네고시오 문의를 통해서만 가능하 신중하게 선택해 주세요.</li>
        </Ul>
      </div>
      <AgentCardCarousel data={agents} />
      <div tw="mt-10 px-5">
        <Button size="bigger" tw="w-full">
          다음
        </Button>
      </div>
    </div>
  );
}
