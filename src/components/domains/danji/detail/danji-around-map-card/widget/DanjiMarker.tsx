import BankMarker from '@/assets/icons/pcMapIcons/bank.svg';

import ConvienceMarker from '@/assets/icons/pcMapIcons/convience.svg';

import HospitalMarker from '@/assets/icons/pcMapIcons/hospital.svg';

import InstituteMarker from '@/assets/icons/pcMapIcons/institute.svg';

import MartMarker from '@/assets/icons/pcMapIcons/mart.svg';

import SubwayMarker from '@/assets/icons/pcMapIcons/subway.svg';

import { iconStyle, StyledCircle, StyledTypography, DuplicatedCountStack, SingleCountStack } from './DanjiMarkerWidget';

interface MarkerProps {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}

export function DanjiSubwayMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  if (duplicatedCount) {
    return (
      <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
        <SubwayMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </DuplicatedCountStack>
    );
  }
  return (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <SubwayMarker style={iconStyle} />
    </SingleCountStack>
  );
}

export function DanjiHospitalMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  return duplicatedCount ? (
    <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <HospitalMarker style={iconStyle} />
      <StyledCircle>
        <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
      </StyledCircle>
    </DuplicatedCountStack>
  ) : (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <HospitalMarker style={iconStyle} />
    </SingleCountStack>
  );
}

export function DanjiMartMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  return duplicatedCount ? (
    <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <MartMarker style={iconStyle} />
      <StyledCircle>
        <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
      </StyledCircle>
    </DuplicatedCountStack>
  ) : (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <MartMarker style={iconStyle} />
    </SingleCountStack>
  );
}

export function DanjiConvienceMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  return duplicatedCount ? (
    <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <ConvienceMarker style={iconStyle} />
      <StyledCircle>
        <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
      </StyledCircle>
    </DuplicatedCountStack>
  ) : (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <ConvienceMarker style={iconStyle} />
    </SingleCountStack>
  );
}

export function DanjiBankMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  return duplicatedCount ? (
    <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <BankMarker style={iconStyle} />
      <StyledCircle>
        <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
      </StyledCircle>
    </DuplicatedCountStack>
  ) : (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <BankMarker style={iconStyle} />
    </SingleCountStack>
  );
}

export function DanjiInstituteMarker({ duplicatedCount, place, onClickMarker, distance }: MarkerProps) {
  return duplicatedCount ? (
    <DuplicatedCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <InstituteMarker style={iconStyle} />
      <StyledCircle>
        <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
      </StyledCircle>
    </DuplicatedCountStack>
  ) : (
    <SingleCountStack onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}>
      <InstituteMarker style={iconStyle} />
    </SingleCountStack>
  );
}
