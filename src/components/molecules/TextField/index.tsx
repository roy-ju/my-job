import { resolveProps } from '@/utils';
import { ChangeEventHandler, forwardRef, HTMLProps, useCallback, useContext } from 'react';
import tw, { css, styled } from 'twin.macro';
import AutocompleteContext from '../Autocomplete/AutocompleteContext';

const StyledContainer = tw.div`flex items-center rounded-lg bg-white overflow-x-hidden`;

const StyledInput = styled.input`
  ${tw`flex-1 min-w-0 h-14 px-4 py-2.5 text-b1 text-gray-1000 bg-transparent placeholder:text-gray-600`}
`;

const StyledTextArea = styled.textarea(({ disabled }) => [
  tw`flex-1 min-w-0 px-4 py-3 leading-4 bg-transparent resize-none h-fit text-b2 text-gray-1000 placeholder:text-gray-600`,
  disabled && tw`text-gray-500 placeholder:text-gray-500`,
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

interface RootProps extends HTMLProps<HTMLDivElement> {}

interface InputProps extends HTMLProps<HTMLInputElement> {}

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

const Container = forwardRef<HTMLDivElement, RootProps>((props, ref) => <StyledContainer ref={ref} {...props} />);

const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'as' | 'theme'>>((inProps, ref) => {
  const { value, onChange, onFocus, onKeyDown } = useContext(AutocompleteContext);
  const resolvedProps = resolveProps(inProps, {
    value,
    onChange,
    onFocus,
    onKeyDown,
  });

  return <StyledInput ref={ref} {...resolvedProps} />;
});

const TextArea = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'as' | 'theme'>>(
  ({ onChange, ...others }, inRef) => {
    const handleResize = useCallback<ChangeEventHandler<HTMLTextAreaElement>>((e) => {
      e.target.style.height = `0px`;
      const { scrollHeight } = e.target;
      e.target.style.height = `${scrollHeight}px`;
    }, []);

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (e) => {
        handleResize(e);
        onChange?.(e);
      },
      [handleResize, onChange],
    );

    return <StyledTextArea ref={inRef} rows={1} onChange={handleChange} {...others} />;
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
