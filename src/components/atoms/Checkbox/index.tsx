import { ChangeEventHandler, forwardRef, HTMLProps, useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import CheckboxUncheckedCircleIcon from '@/assets/icons/checkbox_unchecked_circle.svg';

import CheckboxCheckedCircleIcon from '@/assets/icons/checkbox_checked_circle.svg';

import CheckboxUncheckedIcon from '@/assets/icons/checkbox_unchecked.svg'; //= > 수정

import CheckboxCheckedIcon from '@/assets/icons/checkbox_checked.svg';

import CheckboxBlueCheckedIcon from '@/assets/icons/checkbox_checked_blue.svg'; //= > 수정

import CheckboxGrayCheckedIcon from '@/assets/icons/checkbox_checked_gray.svg';

import CheckboxNoOutlineUnCheckedIcon from '@/assets/icons/checkbox_unchecked_no_outline.svg';

import CheckboxNoOutlineCheckedIcon from '@/assets/icons/checkbox_checked_no_outline.svg';

import useControlled from '@/hooks/useControlled';

const hoverColors = {
  square: tw`[color: theme(colors.gray.300)]`,
  graySquare: tw`[color: theme(colors.gray.300)]`,
  blueSquare: tw`[color: theme(colors.gray.300)]`,

  circle: tw`[color: theme(colors.gray.300)]`,

  noOutline: tw`[color: theme(colors.gray.300)]`,
};

const colors = {
  square: tw`[color: theme(colors.gray.1000)]`,
  graySquare: tw`[color: theme(colors.gray.700)]`,
  blueSquare: tw`[color: theme(colors.nego.800)]`,

  circle: tw`[color: theme(colors.nego.800)]`,

  noOutline: tw`[color: theme(colors.nego.300)]`,
};

const CheckboxRoot = styled.span<{
  iconType?: 'square' | 'circle' | 'blueSquare' | 'graySquare' | 'noOutline';
  checked?: boolean;
}>`
  ${tw`relative inline-flex`}

  svg {
    ${({ iconType, checked }) => iconType && !checked && hoverColors[iconType]};
  }

  :hover {
    svg {
      ${({ iconType, checked }) => iconType && !checked && colors[iconType]};
    }
  }
`;

const CheckboxInput = tw.input`absolute opacity-0 w-full h-full top-0 left-0 z-[1] hover:cursor-pointer`;

interface Props extends HTMLProps<HTMLInputElement> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  iconType?: 'square' | 'circle' | 'blueSquare' | 'graySquare' | 'noOutline';
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
      <CheckboxRoot iconType={iconType}>
        <CheckboxInput type="checkbox" checked={checked} onChange={handleInputChange} ref={ref} {...others} />
        {iconType === 'square' && (checked ? <CheckboxCheckedIcon /> : <CheckboxUncheckedIcon />)}
        {iconType === 'blueSquare' && (checked ? <CheckboxBlueCheckedIcon /> : <CheckboxUncheckedIcon />)}
        {iconType === 'graySquare' && (checked ? <CheckboxGrayCheckedIcon /> : <CheckboxUncheckedIcon />)}
        {iconType === 'circle' && (checked ? <CheckboxCheckedCircleIcon /> : <CheckboxUncheckedCircleIcon />)}
        {iconType === 'noOutline' && (checked ? <CheckboxNoOutlineCheckedIcon /> : <CheckboxNoOutlineUnCheckedIcon />)}
      </CheckboxRoot>
    );
  },
);
