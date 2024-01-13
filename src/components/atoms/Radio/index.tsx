import { ChangeEvent, ChangeEventHandler, forwardRef, HTMLProps, useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import useRadioGroup from '@/components/molecules/RadioGroup/useRadioGroup';

import useControlled from '@/hooks/useControlled';

const RadioRoot = tw.span`inline-flex relative`;

const RadioInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0 z-[1] hover:cursor-pointer`;

const RadioIcon = styled.span<{ checked: boolean; iconBlue: boolean }>`
  ${tw`w-5 h-5 border border-gray-300 bg-white`}
  border-radius: 50%;
  ${({ iconBlue }) => iconBlue && tw`transition-all duration-200`}
  ${({ checked, iconBlue }) =>
    checked ? (iconBlue ? tw`border-[6px] border-nego-800` : tw`border-[6px] border-gray-1000`) : tw``}
`;

function areEqualValues(a: any, b: any) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

interface Props extends HTMLProps<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  iconBlue?: boolean;
}

export default forwardRef<HTMLInputElement, Props>(
  ({ checked: checkedProp, defaultChecked, onChange: onChangeProp, value, iconBlue = false, ...others }, ref) => {
    const radioGroup = useRadioGroup();
    const radioGroupOnChange = radioGroup?.onChange;
    const onChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChangeProp?.(event);
        radioGroupOnChange?.(event);
      },
      [radioGroupOnChange, onChangeProp],
    );
    let contextChecked = checkedProp;

    if (radioGroup) {
      if (typeof contextChecked === 'undefined') {
        contextChecked = areEqualValues(radioGroup.value, value);
      }
    }

    const [checked, setCheckedState] = useControlled({
      controlled: contextChecked,
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
      <RadioRoot>
        <RadioInput {...others} type="radio" value={value} checked={checked} onChange={handleInputChange} ref={ref} />
        <RadioIcon checked={checked} iconBlue={iconBlue} />
      </RadioRoot>
    );
  },
);
