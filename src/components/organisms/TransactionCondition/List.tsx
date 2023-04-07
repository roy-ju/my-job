import React, { Children, ReactNode } from 'react';

interface ListProps {
  children?: ReactNode;
}

export default function List({ children }: ListProps) {
  const childrenArray = Children.toArray(children);

  return (
    <>
      {Array.isArray(childrenArray) &&
        childrenArray.map((child, i) => (
          <>
            {!!i && <div tw="border-t mx-5 border-gray-100" />}
            {child}
          </>
        ))}
    </>
  );
}
