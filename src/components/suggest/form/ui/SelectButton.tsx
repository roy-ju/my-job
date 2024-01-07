import tw, { styled } from 'twin.macro';

import { ButtonV2 } from '@/components/atoms';

const SelectButton = styled(ButtonV2)`
  ${tw`transition-all duration-300 text-body_02`}
`;

SelectButton.defaultProps = {
  radius: 'r100',
  size: 'small',
};

export default SelectButton;
