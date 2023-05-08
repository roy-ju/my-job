import { NavigationHeader } from '@/components/molecules';

interface Props {
  onClickBack?: () => void;
}

export default function VersionInfo({ onClickBack }: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>버전정보</NavigationHeader.Title>
      </NavigationHeader>
    </div>
  );
}
