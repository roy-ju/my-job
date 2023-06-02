import { Button, Ul } from '@/components/atoms';
import { TextField } from '@/components/molecules';
import React, { ChangeEventHandler } from 'react';

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
    <>
      <div tw="py-7 px-5 bg-white">
        <div tw="text-b1 leading-none font-bold mb-4">기존 입력 주소</div>
        <div>
          <div tw="text-b1">{addressLine1}</div>
          <div tw="text-info text-gray-700">{addressLine2}</div>
        </div>
      </div>
      <div tw="border-b border-gray-300" />
      <div tw="py-7 px-5 bg-white">
        <div tw="flex items-center justify-between mb-4">
          <div tw="text-b1 leading-none font-bold">상세 주소 입력</div>
          <Button variant="ghost" size="none" tw="underline text-info leading-4" onClick={onClickSearchAnotherAddress}>
            다른 주소 검색
          </Button>
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
          <li>신축/재건축으로 등기부 조회가 불가한 주택은 등록할 수 없습니다.</li>
          <li>상세 주소 정보가 없다면 비워두고, 다음 버튼을 눌러주세요.</li>
          {errorMessage && <li tw="text-red-800">{errorMessage}</li>}
        </Ul>
      </div>
    </>
  );
}
