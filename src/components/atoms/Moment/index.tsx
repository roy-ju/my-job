import React, { HTMLProps } from 'react';

import moment from 'moment';

import 'moment/locale/ko';

import { formatCreatedTime } from '@/utils/formatsTime';

const DAY_IN_MINUTE = 1440;

/**
 * 날짜문자열을 포맷해서 보여주는 컴포넌트
 */

interface Props extends HTMLProps<HTMLSpanElement> {
  format?: string; // YYYY년 M월 D일
  children?: string; // 포맷할 날짜 문자열
}

export default React.memo(({ format, children, ...spanProps }: Props) => {
  const date = moment(children);
  const diffMinutesFromNow = moment().diff(date, 'minutes');

  if (children && !format) return <span {...spanProps}>{formatCreatedTime(children)}</span>;

  let contents = '';

  switch (format) {
    case 'calendar':
      contents = date.locale('ko').calendar();
      break;
    case 'relative':
      if (diffMinutesFromNow < 1) {
        contents = '조금 전';
      } else if (diffMinutesFromNow < DAY_IN_MINUTE) {
        contents = date.fromNow();
      } else {
        contents = date.format('YYYY.MM.DD');
      }
      break;
    case 'message':
      if (diffMinutesFromNow < 1) contents = '조금 전';
      else if (diffMinutesFromNow < DAY_IN_MINUTE) {
        contents = date.locale('ko').format('a hh:mm');
      } else {
        contents = date.locale('ko').format('YYYY.MM.DD');
      }
      break;
    default:
      contents = date.locale('ko').format(format);
      break;
  }

  return <span {...spanProps}>{contents}</span>;
});
