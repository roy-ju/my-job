import { createContext } from 'react';
import type { ButtonGroupProps } from '.';

interface IButtonGroupContext {
  size?: ButtonGroupProps['size'];
  variant?: ButtonGroupProps['variant'];
  orientation?: ButtonGroupProps['orientation'];
}

const ButtonGroupContext = createContext<IButtonGroupContext>({});

export default ButtonGroupContext;
