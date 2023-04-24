import { NavigationHeader } from '@/components/molecules';
import { SuggestRequestedListNoData } from '@/components/organisms';

export default function SuggestRequestedList() {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>나의 추천 요청</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 min-h-0 overflow-auto">
        <div tw="py-7">
          <SuggestRequestedListNoData />
        </div>
      </div>
    </div>
  );
}
