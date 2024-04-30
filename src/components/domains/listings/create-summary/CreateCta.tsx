import PersistentBottomBarV2 from '@/components/atoms/PersistentBottomBarV2';

import ButtonV2 from '@/components/atoms/ButtonV2';

type CreateCtaProps = {
  isLoading: boolean;
  handleCreate: () => void;
};

export default function CreateCta({ isLoading, handleCreate }: CreateCtaProps) {
  return (
    <PersistentBottomBarV2>
      <ButtonV2 isLoading={isLoading} size="bigger" tw="w-full" onClick={handleCreate}>
        매물등록 신청
      </ButtonV2>
    </PersistentBottomBarV2>
  );
}
