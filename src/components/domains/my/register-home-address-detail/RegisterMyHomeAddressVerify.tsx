import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import ButtonV2 from '@/components/atoms/ButtonV2';

type RegisterMyHomeAddressVerifyProps = {
  handleClick: () => void;
};

export default function RegisterMyHomeAddressVerify({ handleClick }: RegisterMyHomeAddressVerifyProps) {
  return (
    <PersistentBottomBarV2 tw="shadow-none">
      <ButtonV2 tw="w-full" size="bigger" onClick={handleClick}>
        주소 등록하기
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
