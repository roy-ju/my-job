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
      <div tw="flex-1 py-16">
        <div tw="flex flex-col justify-center items-center">
          <div
            tw="w-[60px] h-[60px] rounded-lg bg-gray-300 mb-3 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url('https://negocio-common.s3.ap-northeast-2.amazonaws.com/appicon.png')`,
            }}
          />
          <div tw="text-h3 font-bold">네고시오</div>
          <div tw="text-b2 text-gray-700">2.0</div>
          <div tw="text-b2 mt-7">최신 버전 입니다.</div>
        </div>
      </div>
    </div>
  );
}
