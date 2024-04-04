import React from 'react';

import { SectionProps } from '../types';

const FacilitiesSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="facilitiesSection" ref={ref}>
    {children}
  </section>
));

export default FacilitiesSection;
