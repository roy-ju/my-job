import { Button, Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import { ChangeEventHandler } from 'react';

export interface AddressDetailFormProps {
  addressLine1: string;
  addressLine2: string;
  errorMessage?: string;
  dong?: string;
  ho?: string;
  onChangeDong?: ChangeEventHandler<HTMLInputElement>;
  onChangeHo?: ChangeEventHandler<HTMLInputElement>;
  onClickSearchAnotherAddress?: () => void;
}

export default function AddressDetailForm({
  addressLine1,
  addressLine2,
  errorMessage,
  dong,
  ho,
  onChangeDong,
  onChangeHo,
  onClickSearchAnotherAddress,
}: AddressDetailFormProps) {
  return (
    <div tw="py-6 px-5 bg-white">
      <div tw="flex items-center justify-between mb-3">
        <div tw="text-b1 leading-none font-bold">상세 주소 입력</div>
        <Button variant="ghost" size="none" tw="underline text-info leading-4" onClick={onClickSearchAnotherAddress}>
          다른 주소 검색
        </Button>
      </div>
      <div>
        <div tw="text-b1">{addressLine1}</div>
        <div tw="text-info text-gray-700">{addressLine2}</div>
      </div>
      <div tw="flex gap-2 my-3">
        <TextField variant="outlined" tw="flex-1 relative">
          <TextField.Input label="동" value={dong} onChange={onChangeDong} />
        </TextField>
        <TextField variant="outlined" tw="flex-1">
          <TextField.Input label="호수" value={ho} onChange={onChangeHo} />
        </TextField>
      </div>
      <Ul>
        <li>신축 및 재건축으로 등기부가 조회되지 않는 주택의 경우, 매물등록을 할 수 없습니다.</li>
        <li>해당 정보가 없다면 비워두시고 진행하셔도 됩니다.</li>
        {errorMessage && <li tw="text-red-800">{errorMessage}</li>}
      </Ul>
    </div>
  );
}
