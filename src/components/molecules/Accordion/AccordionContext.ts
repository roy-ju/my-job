import { createContext } from 'react';

interface IAccordionContext {
  expanded?: boolean;
  onChange?: (_: boolean) => void;
}

const AccordionContext = createContext<IAccordionContext>({});

export default AccordionContext;
