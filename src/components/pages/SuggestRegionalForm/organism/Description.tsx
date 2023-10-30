import { TextField } from '@/components/molecules';

import useForm from '../hooks/useForm';

import useFormHandler from '../hooks/useFormHandler';

export default function Description() {
  const form = useForm();

  const value = form?.formData?.description || '';

  const { handleUpdateDescription } = useFormHandler();

  return (
    <div tw="border-t-gray-300">
      <div tw="font-bold mb-1">찾는 집의 종류, 거래조건 등을 알려주세요. (선택)</div>
      <div tw="text-info text-gray-700 mb-4">자세히 알려주실수록 거래가능성이 높아져요.</div>
      <TextField variant="outlined" size="medium">
        <TextField.TextArea
          value={value}
          onChange={(e) => handleUpdateDescription(e)}
          tw="min-h-[98px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
          placeholder="지하철역에서의 거리, 평형, 주차, 층, 세대수, 학군 등 찾는 조건을 상세하게 적어주세요."
          spellCheck="false"
        />
      </TextField>
      <TextField.HelperMessage>{value.length} / 200</TextField.HelperMessage>
    </div>
  );
}
