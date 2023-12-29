import React from 'react';

import { SectionProps } from '../types';

const ListingsSection = React.forwardRef<HTMLDivElement, SectionProps>(({ children }, ref) => (
  <section tw="pt-7" id="listingsSection" ref={ref}>
    {children}
  </section>
));

export default ListingsSection;
