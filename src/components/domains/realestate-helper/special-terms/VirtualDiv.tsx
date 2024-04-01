import { memo } from 'react';

import useVirtualBoxHeight from './hooks/useVirtualBoxHeight';

import { SpecialTermsBottomElementId } from './constants/element_id';

function VirtualDiv() {
  const { boxHeight } = useVirtualBoxHeight();

  return (
    <>
      <div style={{ minHeight: `${boxHeight}px` }} tw="w-full" />
      <div id={SpecialTermsBottomElementId} tw="[min-height: 10px] [min-width: 100%]" />
    </>
  );
}

export default memo(VirtualDiv);
