import { Button } from '@/components/atoms';
import KakaoLogoIcon from '@/assets/icons/kakao_logo.svg';

export interface LoginFormProps {
  onClickKakaoLogin?: () => void;
}

export default function LoginForm({ onClickKakaoLogin }: LoginFormProps) {
  return (
    <div>
      <div tw="flex flex-col gap-3">
        <Button
          variant="ghost"
          tw="w-full bg-yellow-kakao hover:bg-yellow-kakaoHover"
          size="bigger"
          onClick={onClickKakaoLogin}
        >
          <KakaoLogoIcon tw="mr-2" />
          카카오로 시작하기
        </Button>
        <Button variant="outlined" tw="w-full" size="bigger">
          다른 방법으로 시작하기
        </Button>
      </div>
      <div tw="flex items-center justify-center mt-4 gap-2">
        <Button size="none" variant="ghost" tw="text-info font-bold text-gray-500 hover:text-gray-700">
          계정 정보를 잃어버리셨나요?
        </Button>
        <div tw="w-px h-2 bg-gray-100" />
        <Button size="none" variant="ghost" tw="text-info font-bold text-gray-500 hover:text-gray-700">
          자주 묻는 질문
        </Button>
      </div>
    </div>
  );
}
