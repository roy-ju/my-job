import {
  AddressLine1,
  AddressLine2,
  AddressLineInfoWrraper,
} from '../realestate-document-address-detail/widget/RealestateDocumentAddressDetailWidget';

import { PreviouslyEnteredAddressTitle } from './widget/RealestateDocumentVerifyResultWidget';

type AddressLineInfoProps = {
  firstLine: string;
  secondLine: string;
};

export default function PreviouslyEnteredAddress({ firstLine, secondLine }: AddressLineInfoProps) {
  return (
    <>
      <AddressLineInfoWrraper tw="pb-0">
        <PreviouslyEnteredAddressTitle>입력한 주소</PreviouslyEnteredAddressTitle>
        {firstLine && <AddressLine1>{firstLine}</AddressLine1>}
        {secondLine && <AddressLine2>{secondLine}</AddressLine2>}
      </AddressLineInfoWrraper>
    </>
  );
}
