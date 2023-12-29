import React from 'react';

import { SectionProps } from '../types';

const NewsSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section id="newsSection" ref={ref}>
    {children}
  </section>
));

export default NewsSection;
