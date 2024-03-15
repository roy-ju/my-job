import { Loading } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { VerifyStatus } from '@/constants/enums';
import SuccessIcon from '@/assets/icons/success_verify_address.svg';

export interface MyAddressVerifyingProps {
  verifyStatus?: number;
  verifyingSeconds?: number;
  verifyCompletedSeconds?: number;
  onClickBack?: () => void;
}

export default function MyAddressVerifying({
  verifyStatus,
  verifyingSeconds,
  verifyCompletedSeconds,
  onClickBack,
}: MyAddressVerifyingProps) {
  if (verifyStatus === VerifyStatus.None) return null;

  if (verifyStatus === VerifyStatus.Ing)
    return (
      <div tw="h-full flex flex-col relative">
        <NavigationHeader>{onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}</NavigationHeader>
        <div tw="p-5 flex-1 flex flex-col">
          <div tw="text-h2 font-bold">주소를 확인하고 있어요.</div>
          <div tw="text-info text-gray-700 mt-1.5">남은 시간 최대 {verifyingSeconds}초</div>
          <div tw="w-full h-full [padding-top: 163px] flex justify-center pointer-events-none">
            <Loading />
          </div>
        </div>
      </div>
    );

  if (verifyStatus === VerifyStatus.OwnerIng)
    return (
      <div tw="h-full flex flex-col relative">
        <NavigationHeader>{onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}</NavigationHeader>
        <div tw="p-5 flex-1 flex flex-col">
          <div tw="text-h2 font-bold">등기부상 소유자가 맞는지 확인하고 있어요.</div>
          <div tw="text-info text-gray-700 mt-1.5">남은 시간 최대 {verifyingSeconds}초</div>
          <div tw="w-full h-full [padding-top: 163px] flex justify-center pointer-events-none">
            <Loading />
          </div>
        </div>
      </div>
    );

  return (
    <div tw="h-full flex flex-col relative">
      <NavigationHeader>{onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}</NavigationHeader>
      <div tw="p-5 flex-1 flex flex-col">
        <div tw="text-h2 font-bold">우리집 등록이 완료 되었습니다!</div>
        <div tw="text-info text-gray-700 mt-1.5">{verifyCompletedSeconds}초 후 화면이 전환됩니다.</div>
        <div tw="w-full h-full [padding-top: 163px] flex justify-center pointer-events-none">
          <SuccessIcon />
        </div>
      </div>
    </div>
  );
}
