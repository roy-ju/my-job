import { useControlled } from '@/hooks/utils';
import {
  ChangeEventHandler,
  forwardRef,
  HTMLAttributes,
  useCallback,
} from 'react';
import tw from 'twin.macro';

import ToggleOnIcon from '@/assets/icons/toggle_on.svg';
import ToggleOffIcon from '@/assets/icons/toggle_off.svg';

const ToggleRoot = tw.span`inline-flex relative`;
const ToggleInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0`;

interface Props extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default forwardRef<HTMLInputElement, Props>(
  ({ checked: checkedProp, defaultChecked, onChange, ...others }, ref) => {
    const [checked, setCheckedState] = useControlled({
      controlled: checkedProp,
      default: Boolean(defaultChecked),
    });

    const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (event) => {
        setCheckedState(event.target.checked);
        if (onChange) {
          onChange(event);
        }
      },
      [onChange, setCheckedState],
    );

    return (
      <ToggleRoot>
        <ToggleInput
          type="checkbox"
          checked={checked}
          onChange={handleInputChange}
          ref={ref}
          {...others}
        />
        {checked ? <ToggleOnIcon /> : <ToggleOffIcon />}
      </ToggleRoot>
    );
  },
);
