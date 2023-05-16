import moment from 'moment';
import 'moment/locale/ko';

import React, { HTMLProps } from 'react';

/**
 * 날짜문자열을 포맷해서 보여주는 컴포넌트
 */

interface Props extends HTMLProps<HTMLSpanElement> {
  format?: string; // YYYY년 M월 D일
  children?: string; // 포맷할 날짜 문자열
}

export default React.memo(({ format, children, ...spanProps }: Props) => {
  const formattedDate = moment(children);

  let contents = formattedDate.locale('ko').format(format);

  if (format === 'calendar') {
    contents = formattedDate.locale('ko').calendar();
  }
  if (format === 'message') {
    const now = moment();
    const diffMinutes = now.diff(formattedDate, 'minutes');

    if (diffMinutes < 1) contents = '조금 전';
    else if (diffMinutes < 1440) {
      // 24시간 = 1440분
      contents = formattedDate.locale('ko').format('a hh:mm');
    } else {
      contents = formattedDate.locale('ko').format('YYYY.MM.DD');
    }
  }

  return <span {...spanProps}>{contents}</span>;
});
