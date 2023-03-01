import useRadioGroup from '@/components/molecules/RadioGroup/useRadioGroup';
import useControlled from '@/hooks/utils/useControlled';
import {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  HTMLAttributes,
  useCallback,
} from 'react';
import tw, { styled } from 'twin.macro';

const RadioRoot = tw.span`inline-flex relative`;

const RadioInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0 z-[1] hover:cursor-pointer`;

const RadioIcon = styled.span<{ checked: boolean }>`
  ${tw`w-5 h-5 border border-gray-300 bg-white`}
  border-radius: 50%;
  ${({ checked }) => checked && tw`border-[6px] border-gray-1000`}
`;

function areEqualValues(a: any, b: any) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  return String(a) === String(b);
}

type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
} & HTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, Props>(
  (
    {
      checked: checkedProp,
      defaultChecked,
      onChange: onChangeProp,
      value,
      ...others
    },
    ref,
  ) => {
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
        <RadioInput
          {...others}
          type="radio"
          value={value}
          checked={checked}
          onChange={handleInputChange}
          ref={ref}
        />
        <RadioIcon checked={checked} />
      </RadioRoot>
    );
  },
);
