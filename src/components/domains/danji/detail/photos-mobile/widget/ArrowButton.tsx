import ArrowLeft from '@/assets/icons/arrow_left_black.svg';

import ArrowRight from '@/assets/icons/arrow_right_black.svg';

import { StyledBox } from './PhotoGalleryWidget';

type ArrowButtonProps = {
  type: 'left' | 'right';
  handleClick: () => void;
};

export default function ArrowButton({ type, handleClick }: ArrowButtonProps) {
  return (
    <StyledBox
      onClick={handleClick}
      style={
        type === 'left'
          ? {
              left: 0,
              marginLeft: '8px',
            }
          : {
              right: 0,
              marginRight: '8px',
            }
      }
    >
      {type === 'left' ? <ArrowLeft /> : <ArrowRight />}
    </StyledBox>
  );
}
