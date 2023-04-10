import { Ul } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

export default function ListingCreateChooseAgent() {
  return (
    <div>
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="px-5 pt-6">
        <div tw="text-b1 font-bold leading-none mb-3">중개사 선택</div>
        <Ul>
          <li>매물등록 신청 이후, 담당 중개사 변경은 네고시오 문의를 통해서만 가능하 신중하게 선택해 주세요.</li>
        </Ul>
      </div>
    </div>
  );
}
