import { ChangeEventHandler, cloneElement, HTMLProps, ReactElement } from 'react';

import tw, { styled } from 'twin.macro';

type LabelPlacement = 'bottom' | 'top' | 'start' | 'end';

const LabelRoot = styled.label<{ labelPlacement: LabelPlacement }>`
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }

  ${({ labelPlacement }) => {
    if (labelPlacement === 'bottom') {
      return tw`flex-col`;
    }

    if (labelPlacement === 'top') {
      return tw`flex-col-reverse`;
    }

    if (labelPlacement === 'start') {
      return tw`flex-row-reverse`;
    }

    return tw`flex-row`;
  }}
`;

const LabelText = styled.span<{ labelPlacement: LabelPlacement }>`
  ${tw`text-body_01 text-gray-1000`}
  vertical-align: middle;
  ${({ labelPlacement }) => {
    if (labelPlacement === 'bottom') {
      return tw`mt-2`;
    }

    if (labelPlacement === 'top') {
      return tw`mb-2`;
    }

    if (labelPlacement === 'start') {
      return tw`mr-2`;
    }

    return tw`ml-2`;
  }}
`;

const LabelTextBig = styled.span<{ labelPlacement: LabelPlacement }>`
  ${tw`text-body_02 text-gray-1000`}
  vertical-align: middle;
  ${({ labelPlacement }) => {
    if (labelPlacement === 'bottom') {
      return tw`mt-2`;
    }

    if (labelPlacement === 'top') {
      return tw`mb-2`;
    }

    if (labelPlacement === 'start') {
      return tw`mr-2`;
    }

    return tw`ml-2`;
  }}
`;

interface Props extends Omit<HTMLProps<HTMLLabelElement>, 'onChange' | 'label' | 'as' | 'size'> {
  label: string | ReactElement;
  control: ReactElement;
  labelPlacement?: LabelPlacement;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  size?: 'medium' | 'large';
}

export default function Label(props: Props) {
  const { control, label, size = 'medium', labelPlacement = 'end', checked, onChange, value, ...others } = props;

  const controlProps: { [key: string]: any } = {};

  if (typeof control.props.checked === 'undefined' && typeof checked !== 'undefined') {
    controlProps.checked = checked;
  }

  if (typeof control.props.onChange === 'undefined' && typeof onChange !== 'undefined') {
    controlProps.onChange = onChange;
  }

  if (typeof control.props.value === 'undefined' && typeof value !== 'undefined') {
    controlProps.value = value;
  }

  return (
    <LabelRoot labelPlacement={labelPlacement} {...others}>
      {cloneElement(control, controlProps)}

      {size === 'large' ? (
        <LabelTextBig labelPlacement={labelPlacement}>{label}</LabelTextBig>
      ) : (
        <LabelText labelPlacement={labelPlacement}>{label}</LabelText>
      )}
    </LabelRoot>
  );
}
