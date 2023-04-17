import { Button } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { BuyOrRent } from '@/constants/enums';
import { useControlled } from '@/hooks/utils';
import { useCallback, ChangeEventHandler } from 'react';

export interface EtcProps {
  buyOrRent?: number;
  etcs?: string[];
  onChangeEtcs?: (value: string[]) => void;
  description?: string;
  onChangeDescription?: (value: string) => void;
}

const defaultEtcs: string[] = [];

const buyOptions = ['올수리 예정', '실거주 예정'];

const rentOptions = [
  '전문직',
  '대기업 재직',
  '정규직',
  '대학생',
  '반려견 있음',
  '반려묘 있음',
  '깔끔한 편',
  '혼자 거주',
  '성인부부만 거주',
  '여성만 거주',
  '자차 보유',
  '자가 있음',
];

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

  const handleChangeDescription = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (e.target.value.length > 100) {
        return;
      }
      setDescription(e.target.value);
      onChangeDescription?.(e.target.value);
    },
    [setDescription, onChangeDescription],
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

  const options = buyOrRent === BuyOrRent.Buy ? buyOptions : rentOptions;

  return (
    <div>
      <div tw="py-7 px-5">
        <div tw="font-bold mb-1">기타</div>
        <div tw="text-info text-gray-700 mb-4">해당하는 사항을 모두 선택해주세요.</div>
        <div tw="flex flex-wrap gap-3">
          {options.map((item) => (
            <Button
              selected={etcs.includes(item)}
              onClick={() => handleClickOption(item)}
              size="small"
              variant="outlined"
              tw="rounded-4xl"
              key={item}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
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
        <TextField.HelperMessage>{description.length} / 100</TextField.HelperMessage>
      </div>
    </div>
  );
}
