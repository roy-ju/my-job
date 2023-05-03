/* eslint-disable no-octal-escape */

import { formatNumberInKorean } from '@/utils';
import { checkPlatform } from '@/utils/checkPlatform';
import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import moment from 'moment';
import React from 'react';
import tw from 'twin.macro';

interface CustomProperties {
  '--left'?: string;
  '--width'?: string;
}

type TooltipData = {
  value_price?: number;
  value_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date?: Date;
  isManipulate?: boolean;
};

type Props = {
  width: number;
  left?: number;
  top?: number;
  data?: TooltipData;
};

export const ChartTooltip = React.memo(({ width, left = 0, top, data = {} }: Props) => (
  <div>
    <TooltipWithBounds
      top={top}
      left={left}
      className="tooltip-container-2"
      style={{
        ...defaultStyles,
        margin: 0,
        padding: 0,
        left: '50%',
        transform: 'translate(-50%,-110%)',
        boxShadow: 'none',
      }}
    >
      <div
        style={{ '--left': `${left}px`, '--width': `${width}px` } as CustomProperties & React.CSSProperties}
        tw="flex flex-row items-center bg-white max-w-mobile [border-radius: 4px] [text-align: left] [padding: 12px 12px 12px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45"
        css={[
          checkPlatform() === 'pc'
            ? tw`before:[left: calc(var(--left)-6px)]`
            : tw`before:[left: calc(var(--left)-5.5px)]`,
          tw`[border-color: #FF542D] [border-width: 1px] border-solid before:[border-bottom-color: #FF542D] before:[border-bottom-width: 1px] before:[border-right-color: #FF542D]  before:[border-right-width: 1px] before:border-solid `,
          tw`[width: var(--width)]`,
        ]}
      >
        <div>
          {data.date && (
            <div tw="mb-1.5">
              <span tw="text-gray-1000 text-info [line-height: 1] [text-align: left]">
                {moment(data.date).format('YYYY.MM')}
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '14px',
                    color: '#868E96',
                    marginLeft: '1px',
                  }}
                >
                  거래지수 / 평가가격 교차분석
                </span>
              </span>
            </div>
          )}

          <div tw="flex flex-row items-center">
            {!!data.danji_price && (
              <span tw="text-gray-1000 text-info [line-height: 1]">
                거래가격
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: 1,
                    fontWeight: 500,
                    color: '#FF542D',
                    marginLeft: '4px',
                  }}
                >
                  {formatNumberInKorean(Math.floor(data.danji_price / 10000) * 10000)}
                </span>
              </span>
            )}
            <div tw="w-px h-2 bg-gray-300 mx-2" />
            {!!data.value_price && (
              <span tw="text-gray-1000 text-info [line-height: 1]">
                평가가격
                <span
                  style={{
                    fontSize: '12px',
                    lineHeight: 1,
                    fontWeight: 500,
                    color: '#4C6EF5',
                    marginLeft: '4px',
                  }}
                >
                  {formatNumberInKorean(Math.floor(data.value_price / 10000) * 10000)}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </TooltipWithBounds>
  </div>
));
