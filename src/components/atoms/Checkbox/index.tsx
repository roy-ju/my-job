import { ChangeEventHandler, forwardRef, HTMLProps, useCallback } from 'react';

import tw from 'twin.macro';

import CheckboxCheckedIcon from '@/assets/icons/checkbox_checked.svg';

import CheckboxCheckedCircleIcon from '@/assets/icons/checkbox_checked_circle.svg';

import CheckboxUncheckedIcon from '@/assets/icons/checkbox_unchecked.svg';

import CheckboxUncheckedCircleIcon from '@/assets/icons/checkbox_unchecked_circle.svg';

import useControlled from '@/hooks/useControlled';

const CheckboxRoot = tw.span`inline-flex relative`;

const CheckboxInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0 z-[1] hover:cursor-pointer`;

interface Props extends HTMLProps<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  iconType?: 'square' | 'circle';
}

export default forwardRef<HTMLInputElement, Props>(
  ({ checked: checkedProp, defaultChecked, onChange, iconType = 'square', ...others }, ref) => {
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
      <CheckboxRoot>
        <CheckboxInput type="checkbox" checked={checked} onChange={handleInputChange} ref={ref} {...others} />
        {checked ? (
          iconType === 'square' ? (
            <CheckboxCheckedIcon />
          ) : (
            <CheckboxCheckedCircleIcon />
          )
        ) : iconType === 'square' ? (
          <CheckboxUncheckedIcon />
        ) : (
          <CheckboxUncheckedCircleIcon />
        )}
      </CheckboxRoot>
    );
  },
);
