import React from 'react';

import { SectionProps } from '../types';

const RealPriceSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="realPriceSection" ref={ref}>
    {children}
  </section>
));

export default RealPriceSection;
