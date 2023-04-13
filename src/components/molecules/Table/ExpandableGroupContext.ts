import { createContext } from 'react';

interface IExpandableGroupContext {
  expanded?: boolean;
  onChange?: (_: boolean) => void;
}

const ExpandableGroupContext = createContext<IExpandableGroupContext>({});

export default ExpandableGroupContext;
