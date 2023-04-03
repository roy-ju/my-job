import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

export interface MyAddressVerifyingProps {
  onClickBack?: () => void;
}

export default function MyAddressVerifying({ onClickBack }: MyAddressVerifyingProps) {
  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
      </NavigationHeader>
      <div tw="p-5 flex-1 flex flex-col">
        <div tw="text-h2 font-bold">주소를 확인하고 있어요.</div>
        <div tw="text-info text-gray-700 mt-1.5">남은 시간 최대 30초</div>
        <div tw="absolute w-full h-full left-0 top-0 flex items-center justify-center pointer-events-none">
          <Loading />
        </div>
      </div>
    </div>
  );
}
