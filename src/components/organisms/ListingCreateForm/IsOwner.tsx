import { Button } from '@/components/atoms';
import useControlled from '@/hooks/useControlled';
import { useCallback } from 'react';

export interface IsOwnerProps {
  isOwner?: boolean;
  onChangeIsOwner?: (value: boolean) => void;
}

export default function IsOwner({ isOwner: isOwnerProp, onChangeIsOwner }: IsOwnerProps) {
  const [isOwner, setIsOwner] = useControlled({ controlled: isOwnerProp, default: true });

  const handleChangeIsOwner = useCallback(
    (value: boolean) => {
      setIsOwner(value);
      onChangeIsOwner?.(value);
    },
    [setIsOwner, onChangeIsOwner],
  );

  return (
    <div>
      <div tw="text-b1 font-bold leading-none mb-3">매물의 소유자이십니까?</div>
      <div tw="text-info text-gray-700 mb-4">매물등록 신청을 위해 소유자 동의가 필요합니다.</div>
      <div tw="flex flex-col gap-3">
        <Button
          tw="w-full"
          size="bigger"
          variant="outlined"
          selected={isOwner}
          onClick={() => handleChangeIsOwner(true)}
        >
          소유자 본인입니다.
        </Button>
        <Button
          tw="w-full"
          size="bigger"
          variant="outlined"
          selected={!isOwner}
          onClick={() => handleChangeIsOwner(false)}
        >
          소유자 대리인입니다.
        </Button>
      </div>
    </div>
  );
}
