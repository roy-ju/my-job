import tw, { styled } from 'twin.macro';

interface ToggleButtonProps {
  variant: 'select' | 'toggle';
  selected: boolean;
  isIcon?: boolean;
}

const variants = {
  select: tw`h-8 bg-white border border-gray-400 hover:border-nego-600`,
  toggle: tw`h-10 bg-white border border-gray-400 hover:border-nego-600`,
};

const defaultStyle = tw`flex items-center justify-center transition-all text-body_02 text-gray-700`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  ${tw` text-body_02 text-gray-700 flex items-center justify-center`}
  ${({ variant }) => variant && variants[variant]}
  ${(props) => props.selected}
`;

ToggleButton.defaultProps = {
  isIcon: false,
};
