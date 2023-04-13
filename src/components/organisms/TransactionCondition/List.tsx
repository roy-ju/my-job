import React, { Children, ReactNode } from 'react';
import { v4 as uuid4 } from 'uuid';

interface ListProps {
  children?: ReactNode;
}

export default function List({ children }: ListProps) {
  const childrenArray = Children.toArray(children);

  return (
    <React.Fragment key={uuid4()}>
      {Array.isArray(childrenArray) &&
        childrenArray.map((child, i) => (
          <>
            {!!i && <div tw="border-t mx-5 border-gray-100" />}
            {child}
          </>
        ))}
    </React.Fragment>
  );
}
