import { Button } from '@/components/atoms';

import AvatarIcon from '@/assets/icons/avatar.svg';

export interface LoginRequiredProps {
  onClickLogin?: () => void;
}

export default function LoginRequired({ onClickLogin }: LoginRequiredProps) {
  return (
    <div tw="flex flex-col items-center">
      <AvatarIcon tw="mb-4" />
      <div tw="mb-1 text-h2 font-bold text-gray-700 leading-7">로그인이 필요해요</div>
      <div tw="text-b2 leading-6 text-gray-700 mb-4">로그인을 하시고 원하는 매물을 네고해보세요!</div>
      <Button tw="px-6" size="medium" onClick={onClickLogin}>
        로그인하기
      </Button>
    </div>
  );
}
