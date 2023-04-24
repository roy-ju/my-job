import { NavigationHeader } from '@/components/molecules';
import { SuggestReceivedListNoData } from '@/components/organisms';

export default function SuggestReceivedList() {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>추천받은 매물</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex flex-col flex-1 min-h-0 overflow-auto">
        <div tw="py-7">
          <SuggestReceivedListNoData />
        </div>
      </div>
    </div>
  );
}
