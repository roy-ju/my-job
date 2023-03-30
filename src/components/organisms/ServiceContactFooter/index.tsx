import React from 'react';
import { Button } from '@/components/atoms';

export function ServiceContactFooter() {
  return (
    <footer tw="grid py-4 px-5 h-[5.5rem] shadow-[0_0_24px_rgba(0,0,0,.08)]">
      <Button variant="secondary" size="none" tw="h-full">
        문의하기
      </Button>
    </footer>
  );
}
