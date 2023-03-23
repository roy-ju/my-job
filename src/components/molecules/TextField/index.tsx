import { useControlled, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { mergeRefs, resolveProps } from '@/utils';
import React, {
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
import AutocompleteContext from '../Autocomplete/AutocompleteContext';
import TextFieldContext, { SizeType, VariantType } from './TextFieldContext';

interface RootProps extends Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as' | 'size'> {
  variant?: VariantType;
  size?: SizeType;
  hasError?: boolean;
}

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'size'> {
  label?: string;
}

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

const StyledContainer = styled.div<{
  disabled: boolean;
  focused: boolean;
  hasError: boolean;
  variant: NonNullable<RootProps['variant']>;
}>(({ disabled, hasError }) => [
  tw`box-border relative flex items-center overflow-x-hidden bg-white rounded-lg`,
  disabled && tw`bg-gray-100`,
  hasError && tw`border-red-800`,
]);

const StyledInput = styled.input(
  ({ inSize, disabled, label, hasError }: InputProps & { inSize: SizeType; hasError: boolean }) => [
    tw`box-content flex-1 h-4 min-w-0 px-4 py-5 leading-none placeholder-gray-700 bg-transparent text-start text-b1 text-gray-1000`,
    disabled && tw`text-gray-700 placeholder-gray-500`,
    label && tw`px-4 pb-3 pt-7`,
    hasError && tw`placeholder-red-800`,
    inSize === 'medium' && tw`h-4 px-4 py-4 leading-4 text-b2`,
    inSize === 'medium' && label && tw`px-4 pt-6 pb-2`,
  ],
);

const StyledTextArea = styled.textarea(
  ({ inSize, disabled, hasError }: TextAreaProps & { inSize: SizeType; hasError: boolean }) => [
    tw`box-border flex-1 min-w-0 px-4 py-3 leading-8 placeholder-gray-700 bg-transparent resize-none text-start text-b1 text-gray-1000`,
    inSize === 'medium' && tw`leading-6 text-b2`,

    disabled && tw`text-gray-700 placeholder-gray-500`,
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
    disabled && tw`text-gray-500`,
    focused && tw`leading-none translate-y-3 text-info`,
    hasError && tw`text-red-800`,
    inSize === 'medium' && tw`leading-none translate-x-4 translate-y-4 text-b2`,
    inSize === 'medium' && focused && tw`translate-y-2 text-[10px] leading-none`,
  ],
);

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

const Container = forwardRef<HTMLDivElement, RootProps>(
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

const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'as' | 'theme' | 'size'>>(({ label, ...inProps }, ref) => {
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

export default Object.assign(Container, {
  Input,
  TextArea,
  Leading,
  Trailing,
});
