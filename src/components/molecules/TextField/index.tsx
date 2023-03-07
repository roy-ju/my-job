import { forwardRef, HTMLProps } from 'react';
import tw, { styled } from 'twin.macro';

const StyledContainer = tw.div`flex items-center rounded-lg bg-white h-14`;

const StyledInput = styled.input`
  ${tw`flex-1 h-full px-4 py-2.5 text-b1 text-gray-1000 bg-transparent`}
`;

const StyledLeading = tw.span`pl-2.5`;

const StyledTrailing = tw.span`pr-2.5`;

interface RootProps extends HTMLProps<HTMLDivElement> {}

interface InputProps extends HTMLProps<HTMLInputElement> {}

interface LeadingProps extends HTMLProps<HTMLSpanElement> {}

interface TrailingProps extends HTMLProps<HTMLSpanElement> {}

const Container = forwardRef<HTMLDivElement, RootProps>((props, ref) => (
  <StyledContainer ref={ref} {...props} />
));

const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'as' | 'theme'>>(
  (props, ref) => <StyledInput ref={ref} {...props} />,
);

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
