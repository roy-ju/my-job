import moment from 'moment';
import React from 'react';

/**
 * 날짜문자열을 포맷해서 보여주는 컴포넌트
 */

type Props = {
  format: string; // YYYY년 M월 D일
  children: string; // 포맷할 날짜 문자열
} & React.HTMLAttributes<HTMLSpanElement>;

export default React.memo(({ format, children, ...spanProps }: Props) => (
  <span {...spanProps}>{moment(children).format(format)}</span>
));
