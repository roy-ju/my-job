import { useMemo } from 'react';

import moment from 'moment';

import tw, { styled, theme } from 'twin.macro';

import { cuttingDot } from '@/utils/fotmat';

import { DanjiDetailResponse } from '@/services/danji/types';

import ArrowRight from '@/assets/icons/arrow_right_20.svg';

const Wrraper = styled.div`
  ${tw`px-5 py-2`}
`;

const TitleButton = styled.button`
  ${tw`flex flex-row items-center gap-0.5`}
`;

const Title = styled.p`
  ${tw`flex-1 text-left text-gray-800 text-heading_01`}
`;

const Contents = styled.div`
  ${tw`flex flex-col gap-0.5 mt-2`}
`;

const FlexRow = styled.div`
  ${tw`flex flex-row items-center`}
`;

const Content = styled.p`
  ${tw`text-gray-700 text-body_02`}
`;

const Seperator = styled.div`
  ${tw`w-px h-2 mx-2 bg-gray-300`}
`;

export default function DanjiInfo({ danji, handleClick }: { danji: DanjiDetailResponse; handleClick?: () => void }) {
  const address = useMemo(() => danji?.road_name_address || danji?.jibun_address, [danji]);

  const saedaeText = useMemo(() => {
    if (danji.total_saedae_count && danji.total_saedae_count !== '0') {
      return `${danji.total_saedae_count}세대`;
    }

    return '';
  }, [danji]);

  const areaText = useMemo(() => {
    if (danji.jeonyong_min > 0 && danji.jeonyong_max === 0) {
      return `전용 ${cuttingDot(danji.jeonyong_min)}㎡`;
    }

    if (danji.jeonyong_min === 0 && danji.jeonyong_max > 0) {
      return `전용 ${cuttingDot(danji.jeonyong_max)}㎡`;
    }

    if (danji.jeonyong_min > 0 && danji.jeonyong_max > 0) {
      return cuttingDot(danji.jeonyong_min) === cuttingDot(danji?.jeonyong_max)
        ? `전용 ${cuttingDot(danji?.jeonyong_min)}㎡`
        : `전용 ${cuttingDot(danji?.jeonyong_min)} ~ ${cuttingDot(danji?.jeonyong_max)}㎡`;
    }

    return '';
  }, [danji]);

  const acceptedYearText = useMemo(
    () =>
      danji?.use_accepted_year?.replaceAll(' ', '')
        ? `${moment(danji.use_accepted_year).format('YYYY.MM.DD')} 준공`
        : '',
    [danji],
  );

  return (
    <Wrraper tw="py-2">
      <TitleButton onClick={handleClick}>
        <Title>{danji.name}</Title>
        <ArrowRight color={theme`colors.gray.700`} />
      </TitleButton>

      <Contents>
        <Content>{address}</Content>
        <FlexRow>
          {saedaeText && <Content>{saedaeText}</Content>}
          {areaText && (
            <>
              <Seperator />
              <Content>{areaText}</Content>
            </>
          )}
          {acceptedYearText && (
            <>
              <Seperator />
              <Content>{acceptedYearText}</Content>
            </>
          )}
        </FlexRow>
      </Contents>
    </Wrraper>
  );
}
