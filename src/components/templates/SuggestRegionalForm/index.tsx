import { NavigationHeader } from '@/components/molecules';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import FormRenderer from './FormRenderer';

interface Props {
  forms?: string[];
  onClickNext?: () => void;
}

export default function SuggestRegionalForm({ forms, onClickNext }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>지역 매물 추천받기</NavigationHeader.Title>
      </NavigationHeader>
      <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
        {forms?.map((form, index) => (
          <div key={form}>
            <FormRenderer form={form} />
            {forms.length !== index + 1 && <Separator />}
          </div>
        ))}
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickNext}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
