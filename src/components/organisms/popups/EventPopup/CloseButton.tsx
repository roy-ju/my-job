import { theme } from 'twin.macro';

import CloseIcon from '@/assets/icons/icon_x_24_2.svg';

export default function CloseButton({
  colorType,
  handleClose,
}: {
  colorType: 'white' | 'black';
  handleClose?: () => void;
}) {
  return (
    <button type="button" tw="absolute right-5 top-5" onClick={handleClose}>
      <CloseIcon color={colorType === 'white' ? theme`colors.white` : theme`colors.gray.1000`} />
    </button>
  );
}
