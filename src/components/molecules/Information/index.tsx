import React, { ReactNode } from 'react';

interface InformationProps {
  children: ReactNode;
}

type InformationSubComponentProps = Pick<InformationProps, 'children'>;

function InformationTitle({ children }: InformationSubComponentProps) {
  return <strong tw="text-heading_02">{children}</strong>;
}

function InformationContents({ children }: InformationSubComponentProps) {
  return <p tw="text-gray-700 text-body_01">{children}</p>;
}

function InformationMain({ children }: InformationProps) {
  return <div>{children}</div>;
}

export default Object.assign(InformationMain, {
  Title: InformationTitle,
  Contents: InformationContents,
});
