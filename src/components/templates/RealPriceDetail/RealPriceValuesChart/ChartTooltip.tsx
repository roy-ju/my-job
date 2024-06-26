/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-octal-escape */

import { formatNumberInKorean } from '@/utils';
import { checkPlatform } from '@/utils/checkPlatform';
import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import tw from 'twin.macro';

interface CustomProperties {
  '--left'?: string;
  '--width'?: string;
}

type TooltipData = {
  sigungu_price?: number;
  sigungu_count?: number | null;
  sido_price?: number;
  sido_count?: number | null;
  danji_price?: number;
  danji_count?: number | null;
  date?: Date;
  isManipulate?: boolean;
};

type Props = {
  width: number;
  danjiName?: string;
  sidoName?: string;
  sigunguName?: string;
  left?: number;
  top?: number;
  data?: TooltipData;
  setIsLineBreak: Dispatch<SetStateAction<boolean>>;
};

export const ChartTooltip = React.memo(
  ({ width, left = 0, top, data = {}, danjiName, sidoName, sigunguName, setIsLineBreak }: Props) => (
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
          transform: 'translate(-50%,-110%)',
          boxShadow: 'none',
        }}
      >
        <div
          style={{ '--left': `${left}px`, '--width': `${width}px` } as CustomProperties & React.CSSProperties}
          tw="flex flex-row items-center bg-white w-full [border-radius: 8px] [text-align: left] [padding: 8px 12px 8px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45"
          css={[
            checkPlatform() === 'pc'
              ? tw`before:[left: calc(var(--left)-6px)]`
              : tw`before:[left: calc(var(--left)-5.5px)]`,
            tw`[border-color: #4C6EF5] [border-width: 1px] border-solid before:[border-bottom-color: #4C6EF5] before:[border-bottom-width: 1px] before:[border-right-color: #4C6EF5]  before:[border-right-width: 1px] before:border-solid `,
            tw`[width: var(--width)]`,
          ]}
        >
          <div>
            {data.date && (
              <div tw="flex flex-row items-center gap-1">
                <p tw="text-gray-1000 text-info [text-align: left]">{moment(data.date).format('YYYY.MM')}</p>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#868E96',
                    marginLeft: '4px',
                  }}
                >
                  평가가격 평균
                </span>
              </div>
            )}

            <div tw="flex flex-col">
              {!!data.danji_price && (
                <span tw="text-gray-1000 text-info">
                  {danjiName || ''}
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 500,
                      color: '#4C6EF5',
                      marginLeft: '4px',
                    }}
                  >
                    {formatNumberInKorean(Math.floor(data.danji_price / 10000) * 10000)}
                  </span>
                </span>
              )}

              <div tw="flex flex-row items-center">
                {!!data.sigungu_price && (
                  <span tw="text-gray-1000 text-info">
                    {sigunguName || ''}
                    <span
                      style={{
                        fontSize: '12px',
                        lineHeight: '20px',
                        fontWeight: 500,
                        color: '#20C764',
                        marginLeft: '4px',
                      }}
                    >
                      {formatNumberInKorean(Math.floor(data.sigungu_price / 10000) * 10000)}
                    </span>
                  </span>
                )}

                {sidoName === '세종특별자치시'
                  ? null
                  : !!data.sido_price && (
                      <>
                        <div tw="w-px h-2 bg-gray-300 mx-2" />
                        <span tw="text-gray-1000 text-info">
                          {sidoName || ''}
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: '20px',
                              fontWeight: 500,
                              color: '#B197FC',
                              marginLeft: '4px',
                            }}
                          >
                            {formatNumberInKorean(Math.floor(data.sido_price / 10000) * 10000)}
                          </span>
                        </span>
                      </>
                    )}
              </div>
            </div>
          </div>
        </div>
      </TooltipWithBounds>
    </div>
  ),
);
