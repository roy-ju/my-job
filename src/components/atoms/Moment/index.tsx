import moment from 'moment';
import React, { HTMLAttributes } from 'react';

/**
 * 날짜문자열을 포맷해서 보여주는 컴포넌트
 */

interface Props extends HTMLAttributes<HTMLSpanElement> {
  format: string; // YYYY년 M월 D일
  children: string; // 포맷할 날짜 문자열
}

export default React.memo(({ format, children, ...spanProps }: Props) => (
  <span {...spanProps}>{moment(children).format(format)}</span>
));
