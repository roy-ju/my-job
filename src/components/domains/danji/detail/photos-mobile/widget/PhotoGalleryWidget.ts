import styled from '@emotion/styled';

import SwipeableViews from 'react-swipeable-views';

const Box = styled('div')({});

export const Stack = styled('div')({
  height: 'calc(100vh - 56px)',
  position: 'relative',
  background: 'black',
});

export const StyledBox = styled(Box)({
  width: '2.4rem',
  height: '2.4rem',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  alignItems: 'center',
  background: 'white',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  opacity: '0.7',
  cursor: 'pointer',
});

export const Image = styled('img')({ width: '100%' });

export const StyledSwipeableView = styled(SwipeableViews)({
  flex: 1,
  top: '50%',
  position: 'absolute',
  transform: 'translateY(-50%)',
});

export const ImageWrraper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});
