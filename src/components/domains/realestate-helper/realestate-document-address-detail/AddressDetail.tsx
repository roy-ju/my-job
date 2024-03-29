import { ChangeEvent } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { TextFieldV2 } from '@/components/molecules';

import TextButton from '@/components/atoms/TextButton';

import { AddressDetailWrraper, DetailTitle, InputContainer } from './widget/RealestateDocumentAddressDetailWidget';

type AddressDetailProps = {
  type: 'registerMyHome' | 'realestateDocument';
  dong: string;
  ho: string;
  handleChangeDong: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeHo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickSearchAnotherAddress?: () => void;
};

export default function AddressDetail({
  type,
  dong,
  ho,
  handleClickSearchAnotherAddress,
  handleChangeDong,
  handleChangeHo,
}: AddressDetailProps) {
  return (
    <AddressDetailWrraper>
      <MarginTopTwenty />
      <DetailTitle>
        상세 주소 입력
        {type === 'registerMyHome' && (
          <TextButton
            variant="underline"
            title="다른 주소 검색"
            size="large"
            color="gray700"
            tw="ml-auto inline-block"
            onClick={handleClickSearchAnotherAddress}
          />
        )}
      </DetailTitle>
      <MarginTopTwenty />
      <InputContainer>
        <TextFieldV2 variant="outlined">
          <TextFieldV2.Input value={dong} onChange={handleChangeDong} placeholder="동" tw="placeholder-gray-600" />
        </TextFieldV2>
        <TextFieldV2 variant="outlined">
          <TextFieldV2.Input value={ho} onChange={handleChangeHo} placeholder="호수" tw="placeholder-gray-600" />
        </TextFieldV2>
      </InputContainer>
      <MarginTopTwenty />
    </AddressDetailWrraper>
  );
}
