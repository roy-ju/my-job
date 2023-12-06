import { TextField } from '@/components/molecules';
import { RealestateType } from '@/constants/enums';

import useForm from '../../hooks/useForm';

import useFormHandler from '../../hooks/useFormHandler';

export default function Area() {
  const form = useForm();

  const minArea = form?.formData?.minArea || '';

  const maxArea = form?.formData?.maxArea || '';

  const { handleUpdateMinArea, handleUpdateMaxArea } = useFormHandler();

  const isRequired = form?.formData?.realestateType?.includes(RealestateType.Apartment);

  return (
    <div>
      <div tw="mb-4 flex items-center justify-between">
        <div tw="font-bold">
          {!isRequired ? '관심있는 평수를 입력해 주세요. (선택)' : '관심있는 평수를 입력해 주세요.'}
        </div>
      </div>
      <div tw="flex flex-col gap-4">
        <div tw="text-info">최소 평수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label={minArea ? '평수' : '평수 입력'}
            value={minArea}
            onChange={(e) => handleUpdateMinArea(e)}
          />
        </TextField>

        <div tw="text-info">최대 평수</div>
        <TextField variant="outlined">
          <TextField.PriceInput
            suffix="평"
            label={maxArea ? '평수' : '평수 입력'}
            value={maxArea}
            onChange={(e) => handleUpdateMaxArea(e)}
          />
        </TextField>
      </div>
    </div>
  );
}
