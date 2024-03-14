import { MarginTopFourty, MarginTopTwenty } from '@/components/atoms/Margin';

import { AddressLine1, AddressLine2, AddressLineInfoWrraper } from './widget/RealestateDocumentAddressDetailWidget';

type AddressLineInfoProps = {
  firstLine: string;
  secondLine: string;
};

export default function AddressLineInfo({ firstLine, secondLine }: AddressLineInfoProps) {
  return (
    <>
      <MarginTopFourty />
      <AddressLineInfoWrraper>
        {firstLine && <AddressLine1>{firstLine}</AddressLine1>}
        {secondLine && <AddressLine2>{secondLine}</AddressLine2>}
      </AddressLineInfoWrraper>
      <MarginTopTwenty />
    </>
  );
}
