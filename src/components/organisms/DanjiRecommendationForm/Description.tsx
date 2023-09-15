import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';
import { BuyOrRent } from '@/constants/enums';

export interface DescriptionProps {
  description?: string;
  onChangeDescription?: (value: string) => void;
  buyOrRent?: number;
}

export default function Description({
  description: descriptionProp,
  onChangeDescription,
  buyOrRent,
}: DescriptionProps) {
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
      <div tw="font-bold mb-1">찾는 집의 종류, 거래조건 등을 알려주세요. (선택)</div>
      <div tw="text-info text-gray-700 mb-4">원하는 조건을 자세히 알려주실수록 제안받을 매물이 많아져요.</div>
      <TextField variant="outlined" size="medium">
        <TextField.TextArea
          value={description}
          onChange={handleChangeDescription}
          tw="min-h-[98px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
          placeholder={
            buyOrRent === BuyOrRent.Buy
              ? '원하는 층, 방향, 대금지급 조건 및 네고를 위해 제시할 내용 등도 상세하게 적어주세요.'
              : '원하는 학군, 전철역에서 거리, 세대수, 방향,  층수, 주차 등 희망조건을 상세하게 적어주세요.'
          }
          spellCheck="false"
        />
      </TextField>
      <TextField.HelperMessage>{description.length} / 200</TextField.HelperMessage>
    </div>
  );
}
