/* eslint-disable no-octal-escape */

import { checkPlatform } from '@/utils/checkPlatform';
import { defaultStyles, TooltipWithBounds } from '@visx/tooltip';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import tw from 'twin.macro';

interface CustomProperties {
  '--left'?: string;
}

type TooltipData = {
  sigungu_count?: number | null;
  sido_count?: number | null;
  danji_count?: number | null;
  date?: Date;
  isManipulate?: boolean;
};

type Props = {
  danjiName?: string;
  sidoName?: string;
  sigunguName?: string;
  left?: number;
  top?: number;
  data?: TooltipData;
  setIsLineBreak: Dispatch<SetStateAction<boolean>>;
};

export const ChartTooltip = React.memo(
  ({ left = 0, top, data = {}, danjiName, sidoName, sigunguName, setIsLineBreak }: Props) => {
    const isLineBreak = useCallback(() => {
      const danjiN = danjiName || '';
      const danjiP = data.danji_count ? data.danji_count : '';

      const sigunguN = sigunguName || '';
      const sigunguP = data.sigungu_count ? data.sigungu_count : '';

      const sidoN = sidoName || '';
      const sidoP = data.sido_count ? data.sido_count : '';

      const result = danjiN + danjiP + sigunguN + sigunguP + sidoN + sidoP;

      return result.length > 27;
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
            style={{ '--left': `${left}px` } as CustomProperties & React.CSSProperties}
            tw="flex flex-row items-center bg-white [width: 20.9375rem] [min-width: 20.9375rem] [border-radius: 8px] [text-align: left] [padding: 8px 12px 8px 12px] before:[content:''] before:absolute before:[bottom: -5px] before:[width: 10px] before:[height: 10px] before:bg-white before:rotate-45"
            css={[
              checkPlatform() === 'pc'
                ? tw`before:[left: calc(var(--left)-7.07px)]`
                : tw`before:[left: calc(var(--left)-5.8px)]`,
              tw`[border-color: #FF542D] [border-width: 1px] border-solid before:[border-bottom-color: #FF542D] before:[border-bottom-width: 1px] before:[border-right-color: #FF542D]  before:[border-right-width: 1px] before:border-solid `,
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
                      거래가격 평균
                    </span>
                  </span>
                </div>
              )}
              {isLineBreak() ? (
                <div tw="flex flex-col gap-1">
                  <div>
                    {typeof data.danji_count === 'number' && (
                      <span tw="text-gray-1000 text-info [line-height: 1]">
                        {danjiName || ''}
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: 1,
                            fontWeight: 500,
                            color: '#FF542D',
                            marginLeft: '4px',
                          }}
                        >
                          {data.danji_count}건
                        </span>
                      </span>
                    )}
                  </div>

                  <div>
                    {typeof data.sigungu_count === 'number' && (
                      <span tw="text-gray-1000 text-info [line-height: 1]">
                        {sigunguName || ''}
                        <span
                          style={{
                            fontSize: '12px',
                            lineHeight: 1,
                            fontWeight: 500,
                            color: '#E9AC11',
                            marginLeft: '4px',
                          }}
                        >
                          {data.sigungu_count}건
                        </span>
                      </span>
                    )}
                  </div>

                  <div>
                    {typeof data.sido_count === 'number' && (
                      <div>
                        <span tw="text-gray-1000 text-info [line-height: 1]">
                          {sidoName || ''}
                          <span
                            style={{
                              fontSize: '12px',
                              lineHeight: 1,
                              fontWeight: 500,
                              color: '#FF9C72',
                              marginLeft: '4px',
                            }}
                          >
                            {data.sido_count}건
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div tw="flex flex-row items-center">
                  {typeof data.danji_count === 'number' && (
                    <span tw="text-gray-1000 text-info [line-height: 1]">
                      {danjiName || ''}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: 1,
                          fontWeight: 500,
                          color: '#FF542D',
                          marginLeft: '4px',
                        }}
                      >
                        {data.danji_count}건
                      </span>
                    </span>
                  )}
                  <div tw="w-px h-2 bg-gray-300 mx-2" />
                  {typeof data.sigungu_count === 'number' && (
                    <span tw="text-gray-1000 text-info [line-height: 1]">
                      {sigunguName || ''}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: 1,
                          fontWeight: 500,
                          color: '#E9AC11',
                          marginLeft: '4px',
                        }}
                      >
                        {data.sigungu_count}건
                      </span>
                    </span>
                  )}
                  <div tw="w-px h-2 bg-gray-300 mx-2" />
                  {typeof data.sido_count === 'number' && (
                    <span tw="text-gray-1000 text-info [line-height: 1]">
                      {sidoName || ''}
                      <span
                        style={{
                          fontSize: '12px',
                          lineHeight: 1,
                          fontWeight: 500,
                          color: '#FF9C72',
                          marginLeft: '4px',
                        }}
                      >
                        {data.sido_count}건
                      </span>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </TooltipWithBounds>
      </div>
    );
  },
);
