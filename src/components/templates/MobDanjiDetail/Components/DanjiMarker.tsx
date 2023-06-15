// import BankMarker from '@/assets/icons/mobMapIcons/bank.svg';
// import ConvienceMarker from '@/assets/icons/mobMapIcons/convience.svg';
// import HospitalMarker from '@/assets/icons/mobMapIcons/hospital.svg';
// import InstituteMarker from '@/assets/icons/mobMapIcons/institute.svg';
// import MartMarker from '@/assets/icons/mobMapIcons/mart.svg';
// import SubwayMarker from '@/assets/icons/mobMapIcons/subway.svg';
import BankMarker from '@/assets/icons/pcMapIcons/bank.svg';
import ConvienceMarker from '@/assets/icons/pcMapIcons/convience.svg';
import HospitalMarker from '@/assets/icons/pcMapIcons/hospital.svg';
import InstituteMarker from '@/assets/icons/pcMapIcons/institute.svg';
import MartMarker from '@/assets/icons/pcMapIcons/mart.svg';
import SubwayMarker from '@/assets/icons/pcMapIcons/subway.svg';
import styled from '@emotion/styled';

const iconStyle = {
  width: '28px',
  height: '34px',
};

const Stack = styled('div')({});

const StyledCircle = styled('div')({
  position: 'absolute',
  right: '-8px',
  top: '-4px',
  width: '20px',
  height: '20px',
  background: '#1C222B',
  borderRadius: '50%',
  border: 'none',
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledTypography = styled('p')({
  color: 'white',
  fontWeight: 700,
  fontSize: '12px',
  textAlign: 'center',
  lineHeight: 1,
});

export function DanjiSubwayMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
          zIndex: 1000,
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <SubwayMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }
  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <SubwayMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiHospitalMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
          zIndex: 1000,
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <HospitalMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }

  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <HospitalMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiMartMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1000,
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <MartMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }
  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <MartMarker style={{ ...iconStyle }} />
    </Stack>
  );
}

export function DanjiConvienceMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1000,
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <ConvienceMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }
  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <ConvienceMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiBankMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
          zIndex: 1000,
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <BankMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }
  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <BankMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiInstituteMarker({
  duplicatedCount,
  place,
  onClickMarker,
  distance,
}: {
  duplicatedCount?: number;
  place: string | { placeName: string; distance: string }[];
  onClickMarker?: (val: string | { placeName: string; distance: string }[], distance?: string) => void;
  distance?: string;
}) {
  if (duplicatedCount) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '3.6rem',
          paddingTop: '0.4rem',
          paddingBottom: '0.2rem',
          zIndex: 1000,
        }}
        onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
      >
        <InstituteMarker style={iconStyle} />
        <StyledCircle>
          <StyledTypography>{duplicatedCount > 9 ? `${duplicatedCount}+` : duplicatedCount}</StyledTypography>
        </StyledCircle>
      </Stack>
    );
  }
  return (
    <Stack
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 600,
      }}
      onClick={onClickMarker ? () => onClickMarker(place, distance) : () => {}}
    >
      <InstituteMarker style={iconStyle} />
    </Stack>
  );
}
