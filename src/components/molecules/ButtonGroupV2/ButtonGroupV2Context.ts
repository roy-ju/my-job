import { createContext } from 'react';

import type { ButtonGroupV2Props } from '.';

interface IButtonGroupContextV2 {
  size?: ButtonGroupV2Props['size'];
  variant?: ButtonGroupV2Props['variant'];
  orientation?: ButtonGroupV2Props['orientation'];
}

const ButtonGroupV2Context = createContext<IButtonGroupContextV2>({});

export default ButtonGroupV2Context;
