/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { styled } from 'twin.macro';
import Eye from '@/assets/icons/eye.svg';
import Thumb from '@/assets/icons/thumb.svg';
import ThumbRed from '@/assets/icons/thumb_red.svg';
import { Button } from '@/components/atoms';

interface LegalContentProp {
  qnaId?: number;
  status?: string;
  mainText?: string;
  subText?: string;
  likeCount?: number;
  viewCount?: number;
  createdTime?: string;
  isLike?: boolean;
  isMine?: boolean;
  onClickLike?: (liked?: boolean, qnaId?: number) => Promise<void>;
  onClickQnaDetail?: (id?: number) => void;
}

const StyledBox = styled.div`
  min-width: 56px;
  max-width: 56px;
  min-height: 20px;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function LegalContent({
  qnaId,
  status = '답변 완료',
  mainText,
  subText,
  likeCount,
  viewCount,
  createdTime,
  isLike,
  isMine,
  onClickLike,
  onClickQnaDetail,
}: LegalContentProp) {
  return (
    <div tw="px-5 py-4 [border-bottom: 1px solid #E9ECEF]">
      <div tw="flex gap-2 items-center">
        {status === '답변 완료' && (
          <StyledBox tw="bg-nego">
            <span tw="text-info font-semibold text-white">{status}</span>
          </StyledBox>
        )}

        {status === '답변 대기' && (
          <StyledBox tw="bg-gray-600">
            <span tw="text-info font-semibold text-white">{status}</span>
          </StyledBox>
        )}

        {isMine && (
          <StyledBox tw="bg-nego">
            <span tw="text-info font-semibold text-white">내가쓴글</span>
          </StyledBox>
        )}
      </div>

      <div
        tw="mt-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClickQnaDetail?.(qnaId);
        }}
      >
        {mainText && (
          <h2
            tw="text-b2 font-bold [letter-spacing: -0.25px] mb-2"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            <span tw="text-nego">Q. </span>
            {mainText}
          </h2>
        )}

        {subText && (
          <h4
            tw="text-info [letter-spacing: -0.25px] text-gray-700 mb-2"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {subText}
          </h4>
        )}
      </div>

      <div tw="flex items-center gap-3">
        <div tw="flex items-center gap-1">
          <Eye />
          {typeof viewCount === 'number' && (
            <span tw="text-info text-gray-700 font-medium">{viewCount > 99 ? '99+' : viewCount}</span>
          )}
        </div>

        <div tw="flex items-center gap-1">
          {isLike ? (
            <Button
              variant="ghost"
              tw="[padding: 0]"
              onClick={(e) => {
                e?.preventDefault();
                onClickLike?.(isLike, qnaId);
              }}
            >
              <ThumbRed />
            </Button>
          ) : (
            <Button variant="ghost" tw="[padding: 0]" onClick={() => onClickLike?.(isLike, qnaId)}>
              <Thumb />
            </Button>
          )}
          {typeof likeCount === 'number' && (
            <span tw="text-info text-gray-700 font-medium">{likeCount > 99 ? '99+' : likeCount}</span>
          )}
        </div>

        {createdTime && (
          <div tw="flex items-center ml-auto">
            <span tw="text-info [color: #999999]">{createdTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
