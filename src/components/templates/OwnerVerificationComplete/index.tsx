import { NavigationHeader } from '@/components/molecules';
import CloseIcon from '@/assets/icons/close_24.svg';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';

interface Props {
  onClickHome?: () => void;
}

export default function OwnerVerificationComplete({ onClickHome }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 동의</NavigationHeader.Title>
        <NavigationHeader.Button>
          <CloseIcon />
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="pt-7 pb-10 px-5">
          <div tw="text-b1 font-bold mb-1">매물 등록에 동의가 완료되었어요.</div>
          <div tw="text-info text-gray-700">등기부의 정보를 확인하고 매물이 등록돼요.</div>
        </div>
        <Separator />
      </div>
      <PersistentBottomBar>
        <Button tw="w-full" size="bigger" onClick={onClickHome}>
          네고시오 바로가기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
