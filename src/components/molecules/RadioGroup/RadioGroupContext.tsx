import { ChangeEvent, createContext } from 'react';

export interface RadioGroupContextValue {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

/**
 * @ignore - internal component.
 */
const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined,
);

export default RadioGroupContext;
