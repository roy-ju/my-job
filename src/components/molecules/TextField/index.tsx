import { resolveProps } from '@/utils';
import { forwardRef, HTMLProps, useContext } from 'react';
import tw, { styled } from 'twin.macro';
import AutocompleteContext from '../Autocomplete/AutocompleteContext';

const StyledContainer = tw.div`flex items-center rounded-lg bg-white h-14`;

const StyledInput = styled.input`
  ${tw`flex-1 min-w-0 h-full px-4 py-2.5 text-b1 text-gray-1000 bg-transparent placeholder:text-gray-600`}
`;

const StyledLeading = tw.span`pl-2.5`;

const StyledTrailing = tw.span`pr-2.5`;

interface RootProps extends HTMLProps<HTMLDivElement> {}

interface InputProps extends HTMLProps<HTMLInputElement> {}

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

function Leading(props: LeadingProps) {
  return <StyledLeading {...props} />;
}

function Trailing(props: TrailingProps) {
  return <StyledTrailing {...props} />;
}

export default Object.assign(Container, {
  Input,
  Leading,
  Trailing,
});
