import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';

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
      <div tw="font-bold mb-1">네고를 위한 추가 조건이 있다면 알려주세요. (선택)</div>
      <div tw="text-info text-gray-700 mb-4">자세히 알려주실수록 거래가능성이 높아져요.</div>
      <TextField variant="outlined" size="medium">
        {buyOrRent === BuyOrRent.Buy ? (
          <TextField.TextArea
            value={description}
            onChange={handleChangeDescription}
            tw="min-h-[76px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
            placeholder="중층의 매물을 원해요.&#13;&#10;초등학교 가까운 매물 제안해주세요."
            spellCheck="false"
          />
        ) : (
          <TextField.TextArea
            value={description}
            onChange={handleChangeDescription}
            tw="min-h-[54px] placeholder:[font-size: 14px] placeholder:[line-height: 22px] py-4"
            placeholder="예) 판상형을 원해요, 정남향을 원해요"
            spellCheck="false"
          />
        )}
      </TextField>
      <TextField.HelperMessage>{description.length} / 200</TextField.HelperMessage>
    </div>
  );
}
