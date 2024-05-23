import { memo } from 'react';

import tw from 'twin.macro';

import moment from 'moment';

import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';

import { formatNumberInKorean } from '@/utils';

import { checkPlatform } from '@/utils/checkPlatform';

import { TooltipProps } from './chartTypes';

import {
  ColoredTooltipTypography,
  Seperator,
  StyledTooltipTypography,
  TooltipContentsWrraper,
  tooltipStyles,
  TooltipTitleWrraper,
} from './widget/TooltipWiget';

interface CustomProperties {
  '--left'?: string;
  '--width'?: string;
}

const Tooltip = memo(({ left = 0, top, data = {}, buy, jeonsae, width }: TooltipProps) => {
  if (buy && (!data.buy_price || data.buy_price === 0)) return null;

  if (jeonsae && (!data.jeonsae_price || data.jeonsae_price === 0)) return null;

  return (
    <div>
      <TooltipWithBounds
        top={top}
        left={left}
        className="tooltip-container"
        style={{
          ...defaultStyles,
          margin: 0,
          padding: 0,
          left: '50%',
          transform: 'translate(-50%,-109%)',
          boxShadow: 'none',
        }}
      >
        <TooltipContentsWrraper
          style={{ '--left': `${left}px`, '--width': `${width}px` } as CustomProperties & React.CSSProperties}
          css={[
            checkPlatform() === 'pc'
              ? tw`before:[left: calc(var(--left)-6px)]`
              : tw`before:[left: calc(var(--left)-5.5px)]`,
            buy && tooltipStyles.buy,
            jeonsae && tooltipStyles.jeonsae,
            tw`[width: var(--width)]`,
          ]}
        >
          {data.date && (
            <StyledTooltipTypography tw="mr-2">{moment(data.date).format('YYYY.MM')}</StyledTooltipTypography>
          )}

          <Seperator />

          {buy && typeof data.buy_count === 'number' && data.buy_count >= 0 && (
            <TooltipTitleWrraper>
              <StyledTooltipTypography>거래량</StyledTooltipTypography>
              &nbsp;
              <StyledTooltipTypography>{data.buy_count}건</StyledTooltipTypography>
            </TooltipTitleWrraper>
          )}

          {jeonsae && typeof data.jeonsae_count === 'number' && data.jeonsae_count >= 0 && (
            <TooltipTitleWrraper>
              <StyledTooltipTypography>거래량</StyledTooltipTypography>
              &nbsp;
              <StyledTooltipTypography>{data.jeonsae_count}건</StyledTooltipTypography>
            </TooltipTitleWrraper>
          )}

          <Seperator />

          {buy && data.buy_price && data.buy_price > 0 && (
            <StyledTooltipTypography>
              {typeof data.buy_count === 'number' && data.buy_count === 0 ? '직전 실거래가' : '평균 실거래가'}
            </StyledTooltipTypography>
          )}

          {buy && data.buy_price && data.buy_price > 0 && (
            <ColoredTooltipTypography tw="text-nego">
              &nbsp;{formatNumberInKorean(Math.floor(data.buy_price / 10000) * 10000)}
            </ColoredTooltipTypography>
          )}

          {jeonsae && data.jeonsae_price && data.jeonsae_price > 0 && (
            <StyledTooltipTypography>
              {typeof data.jeonsae_count === 'number' && data.jeonsae_count === 0 ? '직전 실거래가' : '평균 실거래가'}
            </StyledTooltipTypography>
          )}

          {jeonsae && data.jeonsae_price && data.jeonsae_price > 0 && (
            <ColoredTooltipTypography tw="text-orange-700">
              &nbsp;
              {formatNumberInKorean(Math.floor(data.jeonsae_price / 10000) * 10000)}
            </ColoredTooltipTypography>
          )}
        </TooltipContentsWrraper>
      </TooltipWithBounds>
    </div>
  );
});

export default Tooltip;
