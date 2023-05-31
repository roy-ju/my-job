import React, { ReactNode } from 'react';

interface InformationProps {
  children: ReactNode;
}

type InformationSubComponentProps = Pick<InformationProps, 'children'>;

function InformationTitle({ children }: InformationSubComponentProps) {
  return <strong tw="text-h2">{children}</strong>;
}

function InformationContents({ children }: InformationSubComponentProps) {
  return <p tw="text-gray-700 text-info">{children}</p>;
}

function InformationMain({ children }: InformationProps) {
  return <div>{children}</div>;
}

export default Object.assign(InformationMain, {
  Title: InformationTitle,
  Contents: InformationContents,
});
