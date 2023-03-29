import React, { ReactNode } from 'react';

interface NoticeProps {
  children: ReactNode;
}

type NoticeSubComponentProps = Pick<NoticeProps, 'children'>;

function NoticeTitle({ children }: NoticeSubComponentProps) {
  return <strong tw="text-h2">{children}</strong>;
}

function NoticeContents({ children }: NoticeSubComponentProps) {
  return <p tw="text-gray-700 text-info">{children}</p>;
}

function NoticeMain({ children }: NoticeProps) {
  return <div>{children}</div>;
}

export const Notice = Object.assign(NoticeMain, {
  Title: NoticeTitle,
  Contents: NoticeContents,
});
