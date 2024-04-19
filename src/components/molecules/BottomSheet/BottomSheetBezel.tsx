import React, { forwardRef } from 'react';

type Props = {};

const BottomSheetBezel = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <div
    tw="py-2 bg-white [border-top-left-radius: 20px] [border-top-right-radius: 20px] [box-shadow: 0px -6px 12px rgba(0, 0, 0, 0.1)]"
    ref={ref}
    {...props}
  >
    <div tw="[min-width: 48px] [max-width: 48px] [min-height: 4px] bg-gray-400 [border-radius: 2px] mx-auto my-2" />
  </div>
));

export default React.memo(BottomSheetBezel);
