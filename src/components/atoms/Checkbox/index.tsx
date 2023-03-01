import { useControlled } from '@/hooks/utils';
import { ChangeEventHandler, forwardRef, useCallback } from 'react';
import tw from 'twin.macro';
import CheckboxCheckedIcon from '@/assets/icons/checkbox_checked.svg';
import CheckboxUncheckedIcon from '@/assets/icons/checkbox_unchecked.svg';

const CheckboxRoot = tw.span`inline-flex relative`;

const CheckboxInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0 z-[1] hover:cursor-pointer`;

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export default forwardRef<HTMLInputElement, Props>(
  ({ checked: checkedProp, defaultChecked, onChange }, ref) => {
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
        <CheckboxInput
          type="checkbox"
          checked={checked}
          onChange={handleInputChange}
          ref={ref}
        />
        {checked ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />}
      </CheckboxRoot>
    );
  },
);
