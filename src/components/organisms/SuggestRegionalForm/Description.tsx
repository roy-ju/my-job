import { TextField } from '@/components/molecules';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';

export interface DescriptionProps {
  description?: string;
  onChangeDescription?: (value: string) => void;
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
    <div>
      <div tw="py-7 px-5 border-t border-t-gray-300">
        <div tw="font-bold mb-1">추가 조건이 있다면 알려주세요. (선택)</div>
        <div tw="text-info text-gray-700 mb-4">자세히 알려주실수록 거래가능성이 높아져요.</div>
        <TextField variant="outlined" size="medium">
          <TextField.TextArea
            value={description}
            onChange={handleChangeDescription}
            tw="min-h-[72px]"
            placeholder="내용을 입력하세요&#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
            spellCheck="false"
          />
        </TextField>
        <TextField.HelperMessage>{description.length} / 200</TextField.HelperMessage>
      </div>
    </div>
  );
}
