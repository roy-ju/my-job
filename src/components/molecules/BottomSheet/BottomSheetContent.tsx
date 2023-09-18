import React, { forwardRef, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  pt?: string;
  pb?: string;
};

const BottomSheetContent = forwardRef<HTMLDivElement, Props>(({ children, pt, pb, ...others }, ref) => (
  <div
    tw="px-5 bg-white"
    style={{ paddingTop: pt ? `${pt}px` : 0, paddingBottom: pb ? `${pb}px` : 0 }}
    ref={ref}
    {...others}
  >
    {children}
  </div>
));

export default React.memo(BottomSheetContent);
