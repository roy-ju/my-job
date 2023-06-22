/* eslint-disable no-octal-escape */

import { checkPlatform } from '@/utils/checkPlatform';
import { round } from '@/utils/fotmat';
import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import tw from 'twin.macro';

interface CustomProperties {
  '--left'?: string;
  '--width'?: string;
}

type TooltipData = {
  sigungu_count?: number | null;
  sido_count?: number | null;
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
  ({ width, left = 0, top, data = {}, danjiName, sidoName, sigunguName, setIsLineBreak }: Props) => {
    const isLineBreak = useCallback(() => {
      const danjiN = danjiName || '';
      const danjiP = data.danji_count ? data.danji_count : '';

      const sigunguN = sigunguName || '';
      const sigunguP = data.sigungu_count ? data.sigungu_count : '';

      const sidoN = sidoName === '세종특별자치시' ? '' : sidoName || '';
      const sidoP = sidoName === '세종특별자치시' ? '' : data.sido_count ? data.sido_count : '';

      const result = danjiN + danjiP + sigunguN + sigunguP + sidoN + sidoP;

      return result.length > 23;
    }, [danjiName, data.danji_count, data.sido_count, data.sigungu_count, sidoName, sigunguName]);

    useEffect(() => {
      if (isLineBreak()) {
        setIsLineBreak(true);
      } else {
        setIsLineBreak(false);
      }
    }, [isLineBreak, setIsLineBreak]);

    return (
      <div>
        <TooltipWithBounds
          top={top}
          left={left}
          className="tooltip-container-10"
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
            tw="flex flex-row items-center bg-white max-w-mobile [border-radius: 8px] [text-align: left] [padding: 8px 12px 8px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45"
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
                <div tw="flex flex-row items-center gap-1">
                  <p tw="text-gray-1000 text-info [text-align: left]">{moment(data.date).format('YYYY.MM')}</p>
                  <p
                    style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '20px',
                      color: '#868E96',
                    }}
                  >
                    1,000세대당 거래량
                  </p>
                </div>
              )}

              <div tw="flex flex-col">
                {typeof data.danji_count === 'number' && (
                  <div>
                    <span tw="text-gray-1000 text-info">
                      {danjiName || ''}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '20px',
                          fontWeight: 500,
                          color: '#FF542D',
                          marginLeft: '4px',
                        }}
                      >
                        {round(data.danji_count,1)==="0.0"? 0:round(data.danji_count,1)}
                      </span>
                    </span>
                  </div>
                )}

                <div tw="flex flex-row items-center">
                  {typeof data.sigungu_count === 'number' && (
                    <span tw="text-gray-1000 text-info">
                      {sigunguName || ''}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: '20px',
                          fontWeight: 500,
                          color: '#E9AC11',
                          marginLeft: '4px',
                        }}
                      >
                        {round(data.sigungu_count,1)==="0.0"? 0:round(data.sigungu_count,1)}
                      </span>
                    </span>
                  )}

                  {sidoName === '세종특별자치시'
                    ? null
                    : typeof data.sido_count === 'number' && (
                        <>
                          <div tw="w-px h-2 bg-gray-300 mx-2" />
                          <span tw="text-gray-1000 text-info">
                            {sidoName || ''}
                            <span
                              style={{
                                fontSize: '12px',
                                lineHeight: '20px',
                                fontWeight: 500,
                                color: '#FF9C72',
                                marginLeft: '4px',
                              }}
                            >
                              {round(data.sido_count,1)==="0.0"? 0:round(data.sido_count,1)}
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
    );
  },
);
