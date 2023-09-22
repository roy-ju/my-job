import React, { ReactNode } from 'react';

import BottomSheetBezel from './BottomSheetBezel';
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
  Header: BottomSheetHeader,
  Content: BottomSheetContent,
});

export default BottomSheet;
