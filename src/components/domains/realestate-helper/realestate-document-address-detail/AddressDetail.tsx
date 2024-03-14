import { ChangeEvent } from 'react';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { TextFieldV2 } from '@/components/molecules';

import { AddressDetailWrraper, DetailTitle, InputContainer } from './widget/RealestateDocumentAddressDetailWidget';

type AddressDetailProps = {
  dong: string;
  ho: string;
  handleChangeDong: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeHo: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function AddressDetail({ dong, ho, handleChangeDong, handleChangeHo }: AddressDetailProps) {
  return (
    <AddressDetailWrraper>
      <MarginTopTwenty />
      <DetailTitle>상세 주소 입력</DetailTitle>
      <MarginTopTwenty />
      <InputContainer>
        <TextFieldV2 variant="outlined">
          <TextFieldV2.Input value={dong} onChange={handleChangeDong} label="동" />
        </TextFieldV2>
        <TextFieldV2 variant="outlined">
          <TextFieldV2.Input value={ho} onChange={handleChangeHo} label="호수" />
        </TextFieldV2>
      </InputContainer>
      <MarginTopTwenty />
    </AddressDetailWrraper>
  );
}
