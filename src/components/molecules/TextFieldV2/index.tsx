import React, {
  ReactNode,
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  HTMLProps,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import tw, { styled } from 'twin.macro';

import useControlled from '@/hooks/useControlled';

import { resolveProps } from '@/utils';

import SuccessIcon from '@/assets/icons/success.svg';

import AutocompleteContext from '../Autocomplete/AutocompleteContext';

import TextFieldContextV2, { VariantTypeV2 } from './TextFieldContext';

interface TextFieldProps extends Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as' | 'size'> {
  variant?: VariantTypeV2;
  hasError?: boolean;
}

interface InputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'theme' | 'type' | 'value' | 'onChange' | 'mode'> {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  mode?: 'text' | 'none' | 'search' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  isLabelBottom?: boolean;
}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

interface ErrorMessageProps {
  children?: ReactNode;
}

interface HelperMessageProps {
  children?: ReactNode;
}

interface SuccessMessageProps {
  children?: ReactNode;
}

type StyledInputProps = InputProps & { hasError: boolean; isLabelBottom?: boolean };

const StyledContainer = styled.div<{
  disabled: boolean;
  focused: boolean;
  hasError: boolean;
  variant: NonNullable<TextFieldProps['variant']>;
}>(({ disabled, hasError }) => [
  tw`box-border relative flex items-center overflow-x-hidden bg-white rounded-lg`,
  disabled && tw`bg-gray-100`,
  hasError && tw`border-red-800`,
]);

const StyledInput = styled.input(({ disabled, label, hasError, isLabelBottom = false }: StyledInputProps) => [
  tw`box-content flex-1 h-4 min-w-0 px-4 py-5 leading-none placeholder-gray-700 bg-transparent text-start text-body_03 text-gray-1000 text-ellipsis`,
  disabled && tw`text-gray-600 placeholder-gray-500 opacity-100`,
  label && tw`px-4 pb-3 pt-7`,
  hasError && tw`placeholder-red-800`,
  label && (isLabelBottom ? tw`px-4 pt-[14px] pb-[34px]` : tw`px-4 pt-[34px] pb-[14px]`),
]);

const StyledLabel = styled.div<{
  focused: boolean;
  disabled: boolean;
  hasError: boolean;
  isBottom?: boolean;
}>(({ focused, disabled, hasError, isBottom = false }) => [
  tw`absolute top-0 left-0 leading-none text-gray-700 transition-all translate-x-4 translate-y-6 pointer-events-none text-b1`,
  disabled && (isBottom ? tw`translate-y-10 text-[12px] leading-none` : tw`translate-y-2.5 text-[12px] leading-none`),
  hasError && tw`text-red-800`,
  focused && (isBottom ? tw`translate-y-10 text-[12px] leading-none` : tw`translate-y-2.5 text-[12px] leading-none`),
  focused && (!hasError ? (isBottom ? tw`text-nego-800` : tw`text-gray-700`) : tw`text-red-800`),
]);

const Border = styled.div<{
  variant: VariantTypeV2;
  hasError: boolean;
  focused: boolean;
  disabled: boolean;
}>(({ focused, variant, hasError, disabled }) => [
  tw`absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none`,
  variant === 'outlined' && tw`border border-gray-300`,
  variant === 'outlined' && focused && tw`border-nego-800`,
  variant === 'outlined' && disabled && tw`border-gray-300`,
  hasError && tw`border border-red-800`,
]);

const StyledLeading = tw.span`pl-2.5`;

const StyledTrailing = tw.span`pr-2.5`;

const Container = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ variant = 'ghost', hasError = false, children, ...nativeProps }, ref) => {
    const [focused, setFocused] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const context = useMemo(
      () => ({
        variant,
        focused,
        disabled,
        hasError,
        setFocused,
        setDisabled,
      }),
      [variant, disabled, setDisabled, focused, setFocused, hasError],
    );

    return (
      <TextFieldContextV2.Provider value={context}>
        <StyledContainer
          ref={ref}
          variant={variant}
          focused={focused}
          disabled={disabled}
          hasError={hasError}
          {...nativeProps}
        >
          {children}
          <Border disabled={disabled} focused={focused} variant={variant} hasError={hasError} />
        </StyledContainer>
      </TextFieldContextV2.Provider>
    );
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, isLabelBottom, mode, ...inProps }, ref) => {
  const autocompleteContext = useContext(AutocompleteContext);
  const { focused, disabled, hasError, setFocused, setDisabled } = useContext(TextFieldContextV2);

  const resolvedProps = resolveProps(inProps, {
    value: autocompleteContext.value,
    onChange: autocompleteContext.onChange,
    onFocus: autocompleteContext.onFocus,
    onKeyDown: autocompleteContext.onKeyDown,
  });

  const { value: valueProp, onChange, onFocus, onBlur, ...others } = resolvedProps;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange, setValue],
  );

  const handleFocus = useCallback<FocusEventHandler<HTMLInputElement>>(
    (e) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus, setFocused],
  );

  const handleBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    (e) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur, setFocused],
  );

  useEffect(() => {
    if (inProps.disabled !== undefined) {
      setDisabled(inProps.disabled);
    }
  }, [inProps.disabled, setDisabled]);

  return (
    <>
      {label && (
        <StyledLabel
          hasError={hasError}
          disabled={disabled}
          focused={disabled ? false : focused || value.length > 0}
          isBottom={isLabelBottom}
        >
          {label}
        </StyledLabel>
      )}
      <StyledInput
        autoComplete="off"
        ref={ref}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        isLabelBottom={isLabelBottom}
        inputMode={mode || 'text'}
        hasError={hasError}
        {...others}
      />
    </>
  );
});

function Leading(props: LeadingProps) {
  return <StyledLeading {...props} />;
}

function Trailing(props: TrailingProps) {
  return <StyledTrailing {...props} />;
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div tw="flex mt-1">
      <span tw="text-body_01 leading-4 pl-2 text-red-800">{children}</span>
    </div>
  );
}

function HelperMessage({ children }: HelperMessageProps) {
  return (
    <div tw="flex mt-1">
      <span tw="text-body_01 leading-4 pl-1 text-gray-700">{children}</span>
    </div>
  );
}

function SuccessMessage({ children }: SuccessMessageProps) {
  return (
    <div tw="flex mt-2">
      <SuccessIcon tw="shrink-0" />
      <span tw="text-info leading-4 pl-1 text-green-1000">{children}</span>
    </div>
  );
}

export default Object.assign(Container, {
  Input,
  Leading,
  Trailing,
  ErrorMessage,
  SuccessMessage,
  HelperMessage,
});
