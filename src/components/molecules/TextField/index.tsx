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
  useRef,
  useState,
} from 'react';

import tw, { css, styled } from 'twin.macro';

import {
  NumberFormatValues,
  NumericFormat,
  NumericFormatProps,
  PatternFormat,
  PatternFormatProps,
} from 'react-number-format';
import { Numeral } from '@/components/atoms';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import useControlled from '@/hooks/useControlled';

import { mergeRefs, resolveProps } from '@/utils';

import ErrorIcon from '@/assets/icons/error.svg';

import SuccessIcon from '@/assets/icons/success.svg';

import AutocompleteContext from '../Autocomplete/AutocompleteContext';

import TextFieldContext, { SizeType, VariantType } from './TextFieldContext';

export interface TextFieldProps extends Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as' | 'size'> {
  variant?: VariantType;
  size?: SizeType;
  hasError?: boolean;
}

interface InputProps
  extends Omit<HTMLProps<HTMLInputElement>, 'as' | 'theme' | 'size' | 'type' | 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

interface ErrorMessageProps {
  children?: ReactNode;
}

interface SuccessMessageProps {
  children?: ReactNode;
}

type StyledInputProps = InputProps & { inSize: SizeType; hasError: boolean };

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

const StyledInput = styled.input(({ inSize, disabled, label, hasError }: StyledInputProps) => [
  tw`box-content flex-1 h-4 min-w-0 px-4 py-5 leading-none placeholder-gray-700 bg-transparent text-start text-b1 text-gray-1000 text-ellipsis`,
  disabled && tw`text-gray-700 placeholder-gray-500 opacity-100`,
  label && tw`px-4 pb-3 pt-7`,
  hasError && tw`placeholder-red-800`,
  inSize === 'small' && tw`[height: 32px] pl-4 pr-2 py-0 text-info leading-4`,
  inSize === 'medium' && tw`h-4 px-4 py-4 leading-4 text-b2`,
  inSize === 'medium' && label && tw`px-4 pt-6 pb-2`,
]);

// prevent props for styled components from being passed to the actual component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledNumericInput = styled(({ inSize, label, hasError, ...others }: NumericFormatProps & StyledInputProps) => (
  <NumericFormat {...others} />
))(({ inSize, disabled, label, hasError }) => [
  tw`box-content flex-1 h-4 min-w-0 px-4 py-5 leading-none placeholder-gray-700 bg-transparent text-start text-b1 text-gray-1000 text-ellipsis`,
  disabled && tw`text-gray-700 placeholder-gray-500 opacity-100`,
  label && tw`px-4 pb-3 pt-7`,
  hasError && tw`placeholder-red-800`,
  inSize === 'small' && tw`[height: 32px] px-4 py-2 text-info leading-4`,
  inSize === 'medium' && tw`h-4 px-4 py-4 leading-4 text-b2`,
  inSize === 'medium' && label && tw`px-4 pt-6 pb-2`,
]);

// prevent props for styled components from being passed to the actual component.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledPatternInput = styled(({ inSize, label, hasError, ...others }: PatternFormatProps & StyledInputProps) => (
  <PatternFormat {...others} />
))(({ inSize, disabled, label, hasError }) => [
  tw`box-content flex-1 h-4 min-w-0 px-4 py-5 leading-none placeholder-gray-700 bg-transparent text-start text-b1 text-gray-1000 text-ellipsis`,
  disabled && tw`text-gray-700 placeholder-gray-500 opacity-100`,
  label && tw`px-4 pb-3 pt-7`,
  hasError && tw`placeholder-red-800`,
  inSize === 'small' && tw`[height: 32px] px-4 py-2 text-info leading-4`,
  inSize === 'medium' && tw`h-4 px-4 py-4 leading-4 text-b2`,
  inSize === 'medium' && label && tw`px-4 pt-6 pb-2`,
]);

const StyledTextArea = styled.textarea(
  ({ inSize, disabled, hasError }: TextAreaProps & { inSize: SizeType; hasError: boolean }) => [
    tw`box-border flex-1 min-w-0 px-4 py-3 leading-8 placeholder-gray-700 bg-transparent resize-none text-start text-b1 text-gray-1000`,
    inSize === 'medium' && tw`leading-6 text-b2`,

    disabled && tw`text-gray-700 placeholder-gray-500 opacity-100`,
    hasError && tw`placeholder-red-800`,
    css`
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    `,
  ],
);

const StyledLabel = styled.div<{ inSize: SizeType; focused: boolean; disabled: boolean; hasError: boolean }>(
  ({ inSize, focused, disabled, hasError }) => [
    tw`absolute top-0 left-0 leading-none text-gray-700 transition-all translate-x-4 translate-y-5 pointer-events-none text-b1`,
    disabled && tw`text-gray-600 opacity-100`,
    focused && tw`leading-none translate-y-3 text-info`,
    hasError && tw`text-red-800`,
    inSize === 'small' && tw`leading-none translate-x-4 translate-y-4 text-info`,
    inSize === 'medium' && tw`leading-none translate-x-4 translate-y-4 text-b2`,
    inSize === 'medium' && focused && tw`translate-y-2 text-[10px] leading-none`,
  ],
);

const Suffix = styled.span<{ inSize: SizeType; label?: string; disabled?: boolean }>(({ inSize, label, disabled }) => [
  tw`box-content h-4 px-4 py-5 leading-none text-b1`,
  disabled && tw`text-gray-700 opacity-100`,
  label && tw`px-4 pb-3 pt-7`,
  inSize === 'small' && tw`[height: 32px] px-4 py-2 leading-4 text-info`,
  inSize === 'medium' && tw`h-4 px-4 py-4 leading-4 text-b2`,
  inSize === 'medium' && label && tw`px-4 pt-6 pb-2`,
]);

const Border = styled.div<{ variant: VariantType; hasError: boolean; focused: boolean; disabled: boolean }>(
  ({ focused, variant, hasError, disabled }) => [
    tw`absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none`,
    variant === 'outlined' && tw`border border-gray-300`,
    variant === 'outlined' && focused && tw`border-gray-1000`,
    variant === 'outlined' && disabled && tw`border-gray-100`,
    hasError && tw`border border-red-800`,
  ],
);

const StyledLeading = tw.span`pl-2.5`;

const StyledTrailing = tw.span`pr-2.5`;

const Container = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ variant = 'ghost', size = 'big', hasError = false, children, ...nativeProps }, ref) => {
    const [focused, setFocused] = useState(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const context = useMemo(
      () => ({
        size,
        variant,
        focused,
        disabled,
        hasError,
        setFocused,
        setDisabled,
      }),
      [variant, size, disabled, setDisabled, focused, setFocused, hasError],
    );

    return (
      <TextFieldContext.Provider value={context}>
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
      </TextFieldContext.Provider>
    );
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...inProps }, ref) => {
  const autocompleteContext = useContext(AutocompleteContext);
  const { size, focused, disabled, hasError, setFocused, setDisabled } = useContext(TextFieldContext);

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
        <StyledLabel inSize={size} hasError={hasError} disabled={disabled} focused={focused || value.length > 0}>
          {label}
        </StyledLabel>
      )}
      <StyledInput
        autoComplete="off"
        ref={ref}
        inSize={size}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        hasError={hasError}
        {...others}
      />
    </>
  );
});

const NumericInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps & NumericFormatProps, 'value' | 'defaultValue'> & { value?: string }
>(({ label, value: valueProp, onChange, onFocus, onBlur, ...others }, ref) => {
  const { size, focused, disabled, hasError, setFocused, setDisabled } = useContext(TextFieldContext);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChange = useCallback<NonNullable<NumericFormatProps['onValueChange']>>(
    (values) => {
      setValue(values.value);
      onChange?.({ target: { value: values.value } } as any);
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
    if (others.disabled !== undefined) {
      setDisabled(others.disabled);
    }
  }, [others.disabled, setDisabled]);

  return (
    <>
      {label && (
        <StyledLabel inSize={size} hasError={hasError} disabled={disabled} focused={focused || value.length > 0}>
          {label}
        </StyledLabel>
      )}
      <StyledNumericInput
        autoComplete="off"
        ref={ref}
        valueIsNumericString
        inSize={size}
        value={value}
        onValueChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        hasError={hasError}
        {...others}
      />
    </>
  );
});

const PatternInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps & PatternFormatProps, 'value' | 'defaultValue'> & { value?: string }
>(({ label, value: valueProp, onChange, onFocus, onBlur, ...others }, ref) => {
  const { size, focused, disabled, hasError, setFocused, setDisabled } = useContext(TextFieldContext);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChange = useCallback<NonNullable<NumericFormatProps['onValueChange']>>(
    (values) => {
      setValue(`${values.value}`);
      onChange?.({ target: { value: `${values.value}` } } as any);
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
    if (others.disabled !== undefined) {
      setDisabled(others.disabled);
    }
  }, [others.disabled, setDisabled]);

  return (
    <>
      {label && (
        <StyledLabel inSize={size} hasError={hasError} disabled={disabled} focused={focused || value.length > 0}>
          {label}
        </StyledLabel>
      )}
      <StyledPatternInput
        autoComplete="off"
        pattern="[0-9]*"
        displayType="input"
        type="text"
        valueIsNumericString
        ref={ref}
        inSize={size}
        value={value}
        onValueChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        hasError={hasError}
        {...others}
      />
    </>
  );
});

const PriceInput = forwardRef<
  HTMLInputElement,
  InputProps & { suffix?: string; isZeroAllowed?: boolean; isNegativeAllowed?: boolean }
>(
  (
    { value: valueProp, onChange, suffix = '만 원', isZeroAllowed = false, isNegativeAllowed = false, ...props },
    ref,
  ) => {
    const { size, disabled } = useContext(TextFieldContext);
    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: '',
    });

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        setValue(e.target.value);
        onChange?.(e);
      },
      [setValue, onChange],
    );

    const isAllowed = useCallback(
      (values: NumberFormatValues) => {
        const val = values.floatValue;
        if (val !== undefined) {
          if (!isZeroAllowed && val === 0) return false;
          if (!isNegativeAllowed && val < 0) return false;
          if (!isNegativeAllowed && val > 9999999) return false;
        }
        return true;
      },
      [isZeroAllowed, isNegativeAllowed],
    );

    return (
      <>
        <NumericInput
          {...props}
          ref={ref}
          thousandSeparator=","
          decimalScale={0}
          value={value}
          isAllowed={isAllowed}
          onChange={handleChange}
          pattern="[0-9]*"
        />
        {value && (
          <Suffix inSize={size} disabled={disabled} label={props.label}>
            {suffix}
          </Suffix>
        )}
      </>
    );
  },
);

const DateInput = forwardRef<HTMLInputElement, InputProps>(({ value: valueProp, onChange, ...props }, ref) => {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [setValue, onChange],
  );

  return <PatternInput format="####-##-##" {...props} ref={ref} value={value} onChange={handleChange} />;
});

const TextArea = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'as' | 'theme'>>(
  ({ value: valueProp, onChange, onFocus, onBlur, ...others }, inRef) => {
    const { size, hasError, setDisabled, setFocused } = useContext(TextFieldContext);

    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const [value, setValueState] = useControlled({
      controlled: valueProp,
      default: '',
    });

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (e) => {
        setValueState(e.target.value);
        onChange?.(e);
      },
      [onChange, setValueState],
    );

    const handleFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus, setFocused],
    );

    const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
      (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur, setFocused],
    );

    useEffect(() => {
      if (others.disabled !== undefined) {
        setDisabled?.(others.disabled);
      }
    }, [others.disabled, setDisabled]);

    useIsomorphicLayoutEffect(() => {
      const target = innerRef.current;
      if (target) {
        target.style.height = `0px`;
        const { scrollHeight } = target;
        target.style.height = `${scrollHeight}px`;
      }
    }, [value]);

    return (
      <StyledTextArea
        autoComplete="off"
        inSize={size}
        hasError={hasError}
        ref={mergeRefs([innerRef, inRef])}
        rows={1}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...others}
      />
    );
  },
);

function Leading(props: LeadingProps) {
  return <StyledLeading {...props} />;
}

function Trailing(props: TrailingProps) {
  return <StyledTrailing {...props} />;
}

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div tw="flex mt-2">
      <ErrorIcon tw="shrink-0" />
      <span tw="text-info leading-4 pl-1 text-red-800">{children}</span>
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

const HelperMessage = tw.div`text-end text-info leading-3 mt-2 h-3 pl-1 text-gray-700`;

function PriceHelperMessage({
  children,
  ...props
}: Omit<HTMLProps<HTMLDivElement>, 'children'> & { children: string | number }) {
  const numberChild = Number(children) ?? 0;

  if (!numberChild) return null;

  return (
    <HelperMessage {...props}>
      <Numeral suffix={` 원`} koreanNumber>
        {numberChild * 10000}
      </Numeral>
    </HelperMessage>
  );
}

export default Object.assign(Container, {
  Input,
  NumericInput,
  PatternInput,
  PriceInput,
  DateInput,
  TextArea,
  Leading,
  Trailing,
  ErrorMessage,
  SuccessMessage,
  HelperMessage,
  PriceHelperMessage,
});
