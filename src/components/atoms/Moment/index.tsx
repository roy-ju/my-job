import moment from 'moment';
import 'moment/locale/ko';

import React, { HTMLProps } from 'react';

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

  let contents = '';

  if (format === 'calendar') {
    contents = date.locale('ko').calendar();
  } else if (format === 'relative') {
    if (diffMinutesFromNow < 1) {
      contents = '조금 전';
    } else if (diffMinutesFromNow < DAY_IN_MINUTE) {
      contents = date.fromNow();
    } else {
      contents = date.format('YYYY.MM.DD');
    }
  } else if (format === 'message') {
    if (diffMinutesFromNow < 1) contents = '조금 전';
    else if (diffMinutesFromNow < DAY_IN_MINUTE) {
      contents = date.locale('ko').format('a hh:mm');
    } else {
      contents = date.locale('ko').format('YYYY.MM.DD');
    }
  } else {
    contents = date.locale('ko').format(format);
  }

  return <span {...spanProps}>{contents}</span>;
});
