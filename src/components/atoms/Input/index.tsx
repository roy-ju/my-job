import { ChangeEvent, ReactNode } from 'react';
import tw, { TwStyle } from 'twin.macro';

type Props = {
  placeholder?: string;
  children?: ReactNode;
  divStyle?: TwStyle;
  inputStyle?: TwStyle;
  icon?: any;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const style = {
  default: tw`relative w-fit bg-white py-2.5 pl-4 pr-2.5 border-[1px] rounded-[0.5rem] shadow-[0px 12px 20px rgba(0, 0, 0, 0.1)] flex items-center`,
  disabled: tw`bg-gray-100`,
};

function Input({
  placeholder,
  children,
  divStyle,
  inputStyle,
  icon,
  disabled,
  onChange,
}: Props) {
  return (
    <div css={[style.default, disabled && style.disabled, divStyle]}>
      {icon}
      <input
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        css={[
          tw` w-[14.6rem] h-[2.25rem]  placeholder:text-b1 placeholder:text-gray-600`,
          disabled && style.disabled,
          inputStyle,
        ]}
        type="text"
      />
      {children}
    </div>
  );
}

export default Input;
