import { NavigationHeader } from '@/components/molecules';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import FormRenderer, { Forms } from './FormRenderer';

export default function SuggestRegionalForm() {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>지역 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
        <FormRenderer form={Forms.Region} />
        <Separator />
        <FormRenderer form={Forms.RealestateType} />
        <Separator />
        <FormRenderer form={Forms.Price} />
        <Separator />
        <FormRenderer form={Forms.Area} />
        <Separator />
        <FormRenderer form={Forms.Floor} />
        <Separator />
        <FormRenderer form={Forms.Description} />
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger">
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
