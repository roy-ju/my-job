import { Button } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { DeregisterForm } from '@/components/organisms';

interface Props {
  onClickBackButton?: () => void;
}

export default function Deregister({ onClickBackButton }: Props) {
  return (
    <div tw="relative flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBackButton} />
        <NavigationHeader.Title>회원탈퇴</NavigationHeader.Title>
        <NavigationHeader.Button tw="ml-auto">
          <Button size="none" variant="ghost" tw="underline text-info leading-4">
            건너뛰기
          </Button>
        </NavigationHeader.Button>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 px-5 py-5 overflow-y-auto">
        <div tw="text-h2 font-bold mb-6">
          네고시오 탈퇴 이유를
          <br />
          알려주세요
        </div>
        <DeregisterForm />
      </div>
      <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
        <Button variant="secondary" size="bigger" tw="w-full">
          다음
        </Button>
      </div>
    </div>
  );
}
