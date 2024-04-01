import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import Loading from '@/components/atoms/Loading';

import { MarginTopSixty, MarginTopEighty } from '@/components/atoms/Margin';

import { VerifyStatus } from '@/constants/enums';

import SuccessIcon from '@/assets/icons/success_verify_address.svg';

import { Contents } from './register-home-address-verifying/widget/RegisterHomeAddressVerifyingWidget';

import useVerifyingAddressHandler from './register-home-address-verifying/hooks/useVerifyingAddressHandler';

const AlreadyExistAddressPopup = dynamic(
  () => import('./register-home-address-verifying/popups/AlreadyExistAddressPopup'),
  { ssr: false },
);

const VerifiedCountReachedLimitPopup = dynamic(
  () => import('./register-home-address-verifying/popups/VerifiedCountReachedLimitPopup'),
  { ssr: false },
);

export default function RegisterHomeAddressVerifying() {
  const { popup, handleClosePopup, verifyStatus, verifyingSeconds, verifyCompletedSeconds } =
    useVerifyingAddressHandler();

  if (verifyStatus === VerifyStatus.None) return null;

  return (
    <>
      <Container>
        <MarginTopSixty />
        <Contents>
          {verifyStatus === VerifyStatus.Ing && (
            <>
              <div>주소를 확인하고 있어요.</div>
              <div>남은 시간 최대 {verifyingSeconds}초</div>
            </>
          )}
          {verifyStatus === VerifyStatus.OwnerIng && (
            <>
              <div>등기부상 소유자가 맞는지 확인하고 있어요.</div>
              <div>남은 시간 최대 {verifyingSeconds}초</div>
            </>
          )}

          {(verifyStatus === VerifyStatus.Success || verifyStatus === VerifyStatus.Completed) && (
            <>
              <div>우리집 등록이 완료 되었습니다!</div>
              <div>{verifyCompletedSeconds}초 후 화면이 전환됩니다.</div>
            </>
          )}
          <MarginTopEighty />
          <div>
            {(verifyStatus === VerifyStatus.Ing || verifyStatus === VerifyStatus.OwnerIng) && <Loading />}
            {(verifyStatus === VerifyStatus.Success || verifyStatus === VerifyStatus.Completed) && <SuccessIcon />}
          </div>
          <MarginTopEighty />
        </Contents>
      </Container>
      {popup === 'alreadyExistAddress' && <AlreadyExistAddressPopup handleConfirm={handleClosePopup} />}
      {popup === 'verifiedCountReachedLimit' && <VerifiedCountReachedLimitPopup handleConfirm={handleClosePopup} />}
    </>
  );
}
