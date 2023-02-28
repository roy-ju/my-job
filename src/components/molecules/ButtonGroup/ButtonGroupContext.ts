import { createContext } from 'react';
import type { ButtonGroupProps } from '.';

interface IButtonGroupContext {
  size?: ButtonGroupProps['size'];
  theme?: ButtonGroupProps['theme'];
  buttonStyle?: ButtonGroupProps['buttonStyle'];
  orientation?: ButtonGroupProps['orientation'];
}

const ButtonGroupContext = createContext<IButtonGroupContext>({});

export default ButtonGroupContext;
