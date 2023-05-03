import { formatNumberInKorean } from '@/utils';
import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import moment from 'moment';
import React from 'react';
import tw, { styled } from 'twin.macro';
import { checkPlatform } from '@/utils/checkPlatform';

interface CustomProperties {
  '--left'?: string;
  '--width'?: string;
}
type TooltipData = {
  buy_price?: number;
  buy_count?: number;
  jeonsae_price?: number;
  jeonsae_count?: number;
  date?: Date;
};

type Props = {
  width: number;
  left?: number;
  top?: number;
  data?: TooltipData;
  buy: boolean;
  jeonsae: boolean;
};

const StyledTooltipTypography = styled.span``;

const ColoredTooltipTypography = styled.span``;

const DanjiChartTooltip = React.memo(({ left = 0, top, data = {}, buy, jeonsae, width }: Props) => {
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
        <div
          style={{ '--left': `${left}px`, '--width': `${width}px` } as CustomProperties & React.CSSProperties}
          tw="flex flex-row items-center justify-center bg-white max-w-mobile [border-radius: 4px] [text-align: center] [padding: 12px 12px 12px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45"
          css={[
            checkPlatform() === 'pc'
              ? tw`before:[left: calc(var(--left)-6px)]`
              : tw`before:[left: calc(var(--left)-5.5px)]`,
            buy &&
              tw`[border-color: #7048E8] [border-width: 1px] border-solid before:[border-bottom-color: #7048E8] before:[border-bottom-width: 1px] before:[border-right-color: #7048E8]  before:[border-right-width: 1px] before:border-solid `,
            jeonsae &&
              tw`[border-color: #FF542D] [border-width: 1px] border-solid before:[border-bottom-color: #FF542D] before:[border-bottom-width: 1px] before:[border-right-color: #FF542D]  before:[border-right-width: 1px] before:border-solid`,
            tw`[width: var(--width)]`,
          ]}
        >
          {data.date && (
            <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap [margin-right: 8px]">
              {moment(data.date).format('YYYY.MM')}
            </StyledTooltipTypography>
          )}
          <div tw="w-px h-2 bg-gray-300 [margin-right: 8px]" />
          {buy && typeof data.buy_count === 'number' && data.buy_count >= 0 && (
            <div tw="flex items-center [margin-right: 8px]">
              <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap">
                거래량
              </StyledTooltipTypography>
              &nbsp;
              <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap">
                {data.buy_count}건
              </StyledTooltipTypography>
            </div>
          )}
          {jeonsae && typeof data.jeonsae_count === 'number' && data.jeonsae_count >= 0 && (
            <div tw="flex items-center [margin-right: 8px]">
              <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap">
                거래량
              </StyledTooltipTypography>
              &nbsp;
              <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-pre-wrap">
                {data.jeonsae_count}건
              </StyledTooltipTypography>
            </div>
          )}
          <div tw="w-px h-2 bg-gray-300 [margin-right: 8px]" />
          {buy && data.buy_price && data.buy_price > 0 && (
            <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-nowrap">
              {typeof data.buy_count === 'number' && data.buy_count === 0 ? '직전 실거래가' : '평균 실거래가'}
            </StyledTooltipTypography>
          )}
          {buy && data.buy_price && data.buy_price > 0 && (
            <ColoredTooltipTypography tw="text-nego [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-nowrap">
              &nbsp;{formatNumberInKorean(Math.floor(data.buy_price / 10000) * 10000)}
            </ColoredTooltipTypography>
          )}

          {jeonsae && data.jeonsae_price && data.jeonsae_price > 0 && (
            <StyledTooltipTypography tw="text-gray-1000 [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-nowrap">
              {typeof data.jeonsae_count === 'number' && data.jeonsae_count === 0 ? '직전 실거래가' : '평균 실거래가'}
            </StyledTooltipTypography>
          )}
          {jeonsae && data.jeonsae_price && data.jeonsae_price > 0 && (
            <ColoredTooltipTypography tw="[color: #FF542D] [font-size: 12px] [line-height: 16px] [letter-spacing: -0.4px] whitespace-nowrap">
              &nbsp;
              {formatNumberInKorean(Math.floor(data.jeonsae_price / 10000) * 10000)}
            </ColoredTooltipTypography>
          )}
        </div>
      </TooltipWithBounds>
    </div>
  );
});

export default DanjiChartTooltip;
