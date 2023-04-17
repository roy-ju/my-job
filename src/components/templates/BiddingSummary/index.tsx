import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

interface Props {
  isCreatingBidding?: boolean;

  onClickBack?: () => void;
  onClickNext?: () => void;
}

export default function BiddingSummary({ isCreatingBidding, onClickBack, onClickNext }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto" />
      <PersistentBottomBar>
        <Button isLoading={isCreatingBidding} tw="w-full" size="bigger" onClick={onClickNext}>
          완료
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
