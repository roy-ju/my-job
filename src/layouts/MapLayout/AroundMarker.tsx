import React from 'react';

import tw from 'twin.macro';

import styled from '@emotion/styled';

import { KakaoMapCategoryCode } from '@/lib/kakao/kakao_map_category';

import BankMarker from '@/assets/icons/pcMapIcons/bank.svg';

import ConvienceMarker from '@/assets/icons/pcMapIcons/convience.svg';

import HospitalMarker from '@/assets/icons/pcMapIcons/hospital.svg';

import InstituteMarker from '@/assets/icons/pcMapIcons/institute.svg';

import MartMarker from '@/assets/icons/pcMapIcons/mart.svg';

import SubwayMarker from '@/assets/icons/pcMapIcons/subway.svg';

interface AroundMarkerProps {
  selected?: boolean;
  type?: string;
  place?: string | string[];
  duplicatedCount?: number;
  distance?: string;
  onClick?: () => void;
}

const iconStyle = {};

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
  letterSpacing: '-0.25px',
});

export function DanjiSubwayMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <SubwayMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiHospitalMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <HospitalMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiMartMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <MartMarker style={{ ...iconStyle }} />
    </Stack>
  );
}

export function DanjiConvienceMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <ConvienceMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiBankMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <BankMarker style={iconStyle} />
    </Stack>
  );
}

export function DanjiInstituteMarker({ duplicatedCount = 0 }: AroundMarkerProps) {
  if (duplicatedCount > 0) {
    return (
      <Stack
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
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
      }}
    >
      <InstituteMarker style={iconStyle} />
    </Stack>
  );
}

export default function AroundMarker({ type, place, duplicatedCount, selected = false, onClick }: AroundMarkerProps) {
  const convertPlaceName = ({ category, name }: { category?: string; name?: string }) => {
    if (!name) return '';

    if (category === KakaoMapCategoryCode.SUBWAY) {
      const index = name.indexOf('역');
      return name.slice(0, index + 1);
    }

    return name;
  };

  return (
    <button type="button" tw="animate-scale will-change-transform [text-rendering: optimizeSpeed]" onClick={onClick}>
      <div
        css={[
          tw`min-w-[77px] w-fit flex items-center h-8 bg-white rounded-[26px] relative shadow-[7px 7px 7px rgba(0, 0, 0, 0.1)]`,
          selected && tw`animate-bounce`,
        ]}
      >
        {type === KakaoMapCategoryCode.SUBWAY && <DanjiSubwayMarker />}
        {type === KakaoMapCategoryCode.HOSPITAL && <DanjiHospitalMarker duplicatedCount={duplicatedCount} />}
        {type === KakaoMapCategoryCode.BANK && <DanjiBankMarker duplicatedCount={duplicatedCount} />}
        {type === KakaoMapCategoryCode.MART && <DanjiMartMarker duplicatedCount={duplicatedCount} />}
        {type === KakaoMapCategoryCode.CONVENIENCESTORE && <DanjiConvienceMarker duplicatedCount={duplicatedCount} />}
        {type === KakaoMapCategoryCode.PUBLICINSTITUTIONS && <DanjiInstituteMarker duplicatedCount={duplicatedCount} />}
        {typeof place === 'string' ? (
          <span tw="text-info font-bold pl-2 pr-3 whitespace-nowrap text-gray-1000">
            {convertPlaceName({ category: type, name: place })}
          </span>
        ) : (
          place &&
          place[0] &&
          (type === KakaoMapCategoryCode.SUBWAY ? (
            <span tw="text-info font-bold pl-3 pr-3 whitespace-nowrap text-gray-1000">{`${convertPlaceName({
              category: type,
              name: place[0],
            })}`}</span>
          ) : (
            <span tw="text-info font-bold pl-3 pr-3 whitespace-nowrap text-gray-1000">{`${convertPlaceName({
              category: type,
              name: place[0],
            })} 외 ${place.length - 1} 곳`}</span>
          ))
        )}
      </div>
    </button>
  );
}
