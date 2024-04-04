import { ReactNode, forwardRef } from 'react';

import styled from '@emotion/styled';

type BoxProps = { children: ReactNode };

const Box = styled('div')({});

const Wrapper = styled(Box)({
  width: '100vw',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 1200,
  overflowX: 'hidden',
  overflowY: 'hidden',
  pointerEvents: 'auto',
});

const FullWidth = styled('div')({
  position: 'relative',
  width: '100vw',
  height: '100%',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  pointerEvents: 'auto',
  width: '100vw',
  overflowX: 'hidden',
  maxWidth: '100%',
  minHeight: '100%',
  backgroundColor: 'white',
  margin: '0 auto',
});

const FullScreen = forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => (
  <Wrapper {...props} ref={ref}>
    <FullWidth>
      <Container>{children}</Container>
    </FullWidth>
  </Wrapper>
));

export default FullScreen;
