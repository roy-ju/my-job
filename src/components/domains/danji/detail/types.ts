import { ForwardedRef, ReactNode } from 'react';

export type SectionProps = {
  children: ReactNode;
  forwardedRef?: ForwardedRef<HTMLDivElement>;
};
