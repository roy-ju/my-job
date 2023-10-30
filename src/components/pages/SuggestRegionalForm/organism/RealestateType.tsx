import { Button } from '@/components/atoms';

import { RealestateType as RealestateEnum } from '@/constants/enums';

import useForm from '../hooks/useForm';

import useFormHandler from '../hooks/useFormHandler';

export default function RealestateType() {
  const form = useForm();

  const { handleUpdateRealestateType } = useFormHandler();

  const selected = (value: RealestateEnum) => form?.formData?.realestateType?.includes(value);

  return (
    <div>
      <div tw="mb-4">
        <div tw="font-bold">매물의 부동산종류를 선택해 주세요. (복수선택)</div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={RealestateEnum.Apartment.toString()}
            selected={selected(RealestateEnum.Apartment)}
            onClick={(e) => handleUpdateRealestateType(e)}
          >
            아파트
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={RealestateEnum.Officetel.toString()}
            selected={selected(RealestateEnum.Officetel)}
            onClick={(e) => handleUpdateRealestateType(e)}
          >
            오피스텔
          </Button>
        </div>
        <div tw="flex gap-3">
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={RealestateEnum.Dandok.toString()}
            selected={selected(RealestateEnum.Dandok)}
            onClick={(e) => handleUpdateRealestateType(e)}
          >
            단독
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={RealestateEnum.Dagagoo.toString()}
            selected={selected(RealestateEnum.Dagagoo)}
            onClick={(e) => handleUpdateRealestateType(e)}
          >
            다가구
          </Button>
          <Button
            size="bigger"
            variant="outlined"
            tw="flex-1"
            value={RealestateEnum.Dasaedae.toString()}
            selected={selected(RealestateEnum.Dasaedae)}
            onClick={(e) => handleUpdateRealestateType(e)}
          >
            빌라
          </Button>
        </div>
      </div>
    </div>
  );
}
