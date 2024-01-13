import { Checkbox, Label } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import useControlled from '@/hooks/useControlled';
import { useCallback, ChangeEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import tw from 'twin.macro';

export interface EtcProps {
  buyOrRent?: number;
  etcs?: string[];
  onChangeEtcs?: (value: string[]) => void;
  description?: string;
  onChangeDescription?: (value: string) => void;
}

const defaultEtcs: string[] = [];

const buyOptions = ['사소한 집상태는 괜찮아요', '집구경 여러번 안해도 돼요'];

export default function Etc({
  buyOrRent,
  etcs: etcsProp,
  description: descriptionProp,
  onChangeEtcs,
  onChangeDescription,
}: EtcProps) {
  const [etcs, setEtcs] = useControlled({
    controlled: etcsProp,
    default: defaultEtcs,
  });

  const [description, setDescription] = useControlled({
    controlled: descriptionProp,
    default: '',
  });

  const [isToastShown, setIsToastShown] = useState(false);

  const handleChangeDescription = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 200) {
        if (!isToastShown) {
          toast.error('더 이상 입력할 수 없습니다.');
          setIsToastShown(true);
        }
        return;
      }
      setDescription(e.target.value);
      onChangeDescription?.(e.target.value);
    },
    [setDescription, onChangeDescription, isToastShown],
  );

  const handleClickOption = useCallback(
    (option: string) => {
      let newEtcs = [...etcs];

      if (etcs.includes(option)) {
        newEtcs = etcs.filter((item) => item !== option);
      } else {
        newEtcs.push(option);
      }
      setEtcs(newEtcs);
      onChangeEtcs?.(newEtcs);
    },
    [etcs, setEtcs, onChangeEtcs],
  );

  return (
    <div>
      {buyOrRent === BuyOrRent.Buy && (
        <div tw="py-10 pb-7 px-5 border-b border-b-gray-300">
          <div tw="font-bold mb-1">추가 제안 내용 (선택) </div>
          <div tw="text-info text-gray-700 mb-4">해당하는 사항을 모두 선택해주세요.</div>
          <div tw="flex flex-wrap gap-3">
            {buyOptions.map((item) => (
              <Label
                key={item}
                control={<Checkbox />}
                checked={etcs.includes(item)}
                onChange={() => handleClickOption(item)}
                label={item}
              />
            ))}
          </div>
        </div>
      )}

      <div tw="pb-10 px-5" css={[buyOrRent === BuyOrRent.Buy ? tw`pt-7` : tw`pt-10`]}>
        <div tw="font-bold mb-1">추가 조건이 있다면 알려주세요. (선택)</div>
        <div tw="text-info text-gray-700 mb-4">자세히 알려주실수록 거래가능성이 높아져요.</div>
        <TextField variant="outlined" size="medium">
          <TextField.TextArea
            value={description}
            onChange={handleChangeDescription}
            tw="min-h-[72px]"
            placeholder="예) 주차는 필요없어요."
            spellCheck="false"
          />
        </TextField>
        <TextField.HelperMessage>{description.length} / 200</TextField.HelperMessage>
      </div>
    </div>
  );
}
