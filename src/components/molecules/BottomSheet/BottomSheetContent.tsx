import React, { forwardRef, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const BottomSheetContent = forwardRef<HTMLDivElement, Props>(({ children, ...others }, ref) => (
  <div tw="px-5 bg-white" ref={ref} {...others}>
    {children}
  </div>
));

export default React.memo(BottomSheetContent);
