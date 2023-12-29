import React from 'react';

import { SectionProps } from '../types';

const InfoSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="infoSection" ref={ref}>
    {children}
  </section>
));

export default InfoSection;
