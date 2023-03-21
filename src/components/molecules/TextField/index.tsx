import { useControlled, useIsomorphicLayoutEffect } from '@/hooks/utils';
import { mergeRefs, resolveProps } from '@/utils';
import {
  ChangeEventHandler,
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
import TextFieldContext from './TextFieldContext';

const StyledContainer = styled.div<{ disabled?: boolean }>(({ disabled = false }) => [
  tw`flex items-center overflow-x-hidden bg-white rounded-lg`,
  disabled && tw`bg-gray-100`,
]);

const StyledInput = styled.input(({ disabled }) => [
  tw`flex-1 min-w-0 h-14 px-4 py-2.5 text-b1 text-gray-1000 bg-transparent placeholder-gray-700`,
  disabled && tw`placeholder-gray-500`,
]);

const StyledTextArea = styled.textarea(({ disabled }) => [
  tw`flex-1 min-w-0 px-4 py-3 leading-4 placeholder-gray-700 bg-transparent resize-none h-fit text-b2 text-gray-1000`,
  disabled && tw`placeholder-gray-500`,
  css`
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  `,
]);

const StyledLeading = tw.span`pl-2.5`;

const StyledTrailing = tw.span`pr-2.5`;

interface RootProps extends Omit<HTMLProps<HTMLDivElement>, 'theme' | 'as'> {}

interface InputProps extends HTMLProps<HTMLInputElement> {}

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

const Container = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const [disabled, setDisabled] = useState<boolean>();

  const context = useMemo(
    () => ({
      disabled,
      setDisabled,
    }),
    [disabled, setDisabled],
  );

  return (
    <TextFieldContext.Provider value={context}>
      <StyledContainer ref={ref} disabled={disabled} {...props} />
    </TextFieldContext.Provider>
  );
});

const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'as' | 'theme'>>((inProps, ref) => {
  const { value, onChange, onFocus, onKeyDown } = useContext(AutocompleteContext);

  const { setDisabled } = useContext(TextFieldContext);

  const resolvedProps = resolveProps(inProps, {
    value,
    onChange,
    onFocus,
    onKeyDown,
  });

  useEffect(() => {
    setDisabled?.(inProps.disabled);
  }, [inProps.disabled, setDisabled]);

  return <StyledInput ref={ref} {...resolvedProps} />;
});

const TextArea = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'as' | 'theme'>>(
  ({ value: valueProp, onChange, ...others }, inRef) => {
    const { setDisabled } = useContext(TextFieldContext);

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

    useEffect(() => {
      setDisabled?.(others.disabled);
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
      <StyledTextArea ref={mergeRefs([innerRef, inRef])} rows={1} value={value} onChange={handleChange} {...others} />
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
