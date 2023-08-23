import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';

export interface DescriptionProps {
  description?: string;
  onChangeDescription?: (value: string) => void;
  buyOrRent?: number;
}

export default function Description({ description: descriptionProp, onChangeDescription }: DescriptionProps) {
  const [description, setDescription] = useControlled({
    controlled: descriptionProp,
    default: '',
  });

  const handleChangeDescription = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 200) {
        return;
      }
      setDescription(e.target.value);
      onChangeDescription?.(e.target.value);
    },
    [setDescription, onChangeDescription],
  );

  return (
    <div tw="border-t-gray-300">
      <div tw="font-bold mb-1">네고를 위한 추가 조건이 있다면 알려주세요. (선택)</div>
      <div tw="text-info text-gray-700 mb-4">자세히 알려주실수록 거래가능성이 높아져요.</div>
      <TextField variant="outlined" size="medium">
        <TextField.TextArea
          value={description}
          onChange={handleChangeDescription}
          tw="min-h-[98px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
          placeholder="원하는 학군, 지하철역에서 거리, 세대수, 방향, 층수, 주차&#13;&#10;등 희망조건을 상세하게 적어주세요."
          spellCheck="false"
        />
      </TextField>
      <TextField.HelperMessage>{description.length} / 200</TextField.HelperMessage>
    </div>
  );
}
