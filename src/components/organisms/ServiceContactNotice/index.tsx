import React, { ReactNode } from 'react';

interface ServiceContactNoticeProps {
  children: ReactNode;
}

type ServiceContactNoticeSubComponentProps = Pick<ServiceContactNoticeProps, 'children'>;

function ServiceContactNoticeTitle({ children }: ServiceContactNoticeSubComponentProps) {
  return <strong tw="text-h2">{children}</strong>;
}

function ServiceContactNoticeContents({ children }: ServiceContactNoticeSubComponentProps) {
  return <p tw="text-gray-700 text-info">{children}</p>;
}

function ServiceContactNoticeMain({ children }: ServiceContactNoticeProps) {
  return <div>{children}</div>;
}

export const ServiceContactNotice = Object.assign(ServiceContactNoticeMain, {
  Title: ServiceContactNoticeTitle,
  Contents: ServiceContactNoticeContents,
});
