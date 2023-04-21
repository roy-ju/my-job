import { Button } from '@/components/atoms';
import { RealestateType as RealestateTypeType } from '@/constants/enums';

export interface RealestateTypeProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function RealestateType({ value, onChange }: RealestateTypeProps) {
  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">추천받고 싶은 매물의 부동산종류를 선택해 주세요</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === RealestateTypeType.Apartment}
            onClick={() => onChange?.(RealestateTypeType.Apartment)}
          >
            아파트
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === RealestateTypeType.Officetel}
            onClick={() => onChange?.(RealestateTypeType.Officetel)}
          >
            오피스텔
          </Button>
        </div>
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === RealestateTypeType.Dandok}
            onClick={() => onChange?.(RealestateTypeType.Dandok)}
          >
            단독
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === RealestateTypeType.Dagagoo}
            onClick={() => onChange?.(RealestateTypeType.Dagagoo)}
          >
            다가구
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            selected={value === RealestateTypeType.Dasaedae}
            onClick={() => onChange?.(RealestateTypeType.Dasaedae)}
          >
            빌라
          </Button>
        </div>
      </div>
    </div>
  );
}
