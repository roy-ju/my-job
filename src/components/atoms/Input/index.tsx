import { ChangeEvent, forwardRef, HTMLProps, ReactNode } from 'react';
import tw, { TwStyle } from 'twin.macro';

interface Props extends HTMLProps<HTMLInputElement> {
  placeholder?: string;
  children?: ReactNode;
  divStyle?: TwStyle;
  inputStyle?: TwStyle;
  icon?: any;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const style = {
  default: tw`relative w-full bg-white py-2.5 pl-4 pr-2.5 border-[1px] rounded-[0.5rem]  flex items-center`,
  disabled: tw`bg-gray-100`,
};

const Input = forwardRef<HTMLDivElement, Props>(
  (
    {
      placeholder,
      children,
      divStyle,
      inputStyle,
      icon,
      disabled,
      onChange,
      onFocus,
      onBlur,
      value,
      ...others
    },
    ref,
  ) => (
    <div ref={ref} css={[style.default, disabled && style.disabled, divStyle]}>
      {icon}
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        css={[
          tw` w-full h-[2.25rem]  placeholder:text-b1 placeholder:text-gray-600`,
          disabled && style.disabled,
          inputStyle,
        ]}
        type="text"
        {...others}
      />
      {children}
    </div>
  ),
);
export default Input;
