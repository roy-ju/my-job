import { Button } from '@/components/atoms';
import { ChangeEvent } from 'react';
import QuestionIcon from '@/assets/icons/question.svg';
import RemoveIcon from '@/assets/icons/remove.svg';
import { TextField } from '@/components/molecules';
import useTooltip from '@/states/tooltip';

interface ContainerProps {
  onClickAdd?: () => void;
}

function Container({ onClickAdd }: ContainerProps) {
  const { openTooltip } = useTooltip();

  return (
    <div>
      <div tw="flex items-start justify-between">
        <div>
          <div tw="mb-3 flex items-center gap-1">
            <div tw="text-b1 leading-none font-bold">선순위 담보권</div>
            <Button variant="ghost" size="none" tw="pb-px" onClick={() => openTooltip('collaterals')}>
              <QuestionIcon />
            </Button>
          </div>
          <div tw="text-info text-gray-700">매물과 관련된 채무가 없다면 다음을 누르세요.</div>
        </div>
        <Button variant="outlined" size="small" onClick={onClickAdd}>
          항목 추가
        </Button>
      </div>
    </div>
  );
}

interface ItemProps {
  name?: string;
  price?: string;
  onChangeName?: (value: string) => void;
  onChangePrice?: (value: string) => void;
  onClickRemove?: () => void;
}

function Item({ name, price, onChangeName, onChangePrice, onClickRemove }: ItemProps) {
  return (
    <div>
      <div tw="flex items-center gap-1">
        <Button variant="ghost" size="none" onClick={onClickRemove}>
          <RemoveIcon />
        </Button>
        <div tw="text-info">항목</div>
      </div>
      <div tw="flex flex-col gap-4 mt-4">
        <TextField variant="outlined">
          <TextField.Input
            label="채무내용"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeName?.(e.target.value)}
          />
        </TextField>
        <TextField variant="outlined">
          <TextField.PriceInput
            label="금액"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangePrice?.(e.target.value)}
          />
        </TextField>
      </div>
    </div>
  );
}

export default Object.assign(Container, { Item });
