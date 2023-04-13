import React, { Children, ReactNode } from 'react';

interface ListProps {
  children?: ReactNode;
}

/* eslint-disable */

export default function List({ children }: ListProps) {
  const childrenArray = Children.toArray(children);

  return (
    <>
      {Array.isArray(childrenArray) &&
        childrenArray.map((child, i) => (
          <React.Fragment key={i}>
            {!!i && <div tw="border-t mx-5 border-gray-100" />}
            {child}
          </React.Fragment>
        ))}
    </>
  );
}
