import React, { ReactNode } from 'react';

import BottomSheetBezel from './BottomSheetBezel';
import BottomSheetBezelV2 from './BottomSheetBezelV2';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHeader from './BottomSheetHeader';

interface BottomSheetProps {
  children?: ReactNode;
}

function BottomSheetComponent({ children }: BottomSheetProps) {
  return <>{children}</>;
}

const BottomSheet = Object.assign(BottomSheetComponent, {
  Bezel: BottomSheetBezel,
  BezelV2: BottomSheetBezelV2,
  Header: BottomSheetHeader,
  Content: BottomSheetContent,
});

export default BottomSheet;
