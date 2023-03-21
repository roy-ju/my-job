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

export default React.memo(({ format, children, ...spanProps }: Props) => (
  <span {...spanProps}>
    {format === 'calendar' ? moment(children).locale('ko').calendar() : moment(children).locale('ko').format(format)}
  </span>
));
