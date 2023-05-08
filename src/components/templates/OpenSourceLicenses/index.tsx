import { NavigationHeader } from '@/components/molecules';

interface Props {
  onClickBack?: () => void;
}

export default function OpenSourceLicenses({ onClickBack }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>오픈소스 라이선스</NavigationHeader.Title>
      </NavigationHeader>
    </div>
  );
}
