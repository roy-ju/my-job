import React, { forwardRef } from 'react';

type Props = {};

const BottomSheetBezel = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div
    tw="py-2.5 bg-white [border-top-left-radius: 20px] [border-top-right-radius: 20px] [box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.1)]"
    ref={ref}
    {...props}
  >
    <div tw="[min-width: 56px] [max-width: 56px] [min-height: 4px] bg-gray-300 [border-radius: 100px] mx-auto" />
  </div>
));

export default React.memo(BottomSheetBezel);
