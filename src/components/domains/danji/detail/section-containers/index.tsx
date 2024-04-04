import React from 'react';

import { SectionProps } from '../types';

export const FacilitiesSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="facilitiesSection" ref={ref}>
    {children}
  </section>
));

export const InfoSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="infoSection" ref={ref}>
    {children}
  </section>
));

export const ListingsSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section tw="pt-7" id="listingsSection" ref={ref}>
    {children}
  </section>
));

export const NewsSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="newsSection" ref={ref}>
    {children}
  </section>
));

export const RealPriceSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="realPriceSection" ref={ref}>
    {children}
  </section>
));
