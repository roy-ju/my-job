import {
  CSSProperties,
  ComponentPropsWithoutRef,
  ReactElement,
  useRef,
  useState,
  useEffect,
  memo,
  useCallback,
} from 'react';

import { styled } from 'twin.macro';

import { motion, useAnimationControls } from 'framer-motion';

import { v4 } from 'uuid';

const Container = styled.div`
  position: relative;
  overflow-x: hidden;
`;

const DragConstraints = styled.div`
  overflow: visible;
  width: fit-content;
  max-width: 100%;
`;

const Track = styled(motion.div)`
  width: fit-content;
  overflow: visible;
  display: flex;
  & > * {
    flex-shrink: 0;
  }
`;

const useResize = (callback: () => void) => {
  useEffect(() => {
    // `resize` 이벤트 리스너 등록
    window.addEventListener('resize', callback);

    // 컴포넌트가 언마운트될 때, `resize` 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, [callback]); // 의존성 배열에 콜백을 포함합니다.
};

interface Props extends ComponentPropsWithoutRef<'div'> {
  trackStyle?: CSSProperties;
  gap?: number;
  totalSlidesMarginRight?: number;
  renderRightButtonIsNotIntersection?: () => ReactElement;
}

function Carousel({
  gap = 0,
  totalSlidesMarginRight = 0,
  trackStyle,
  renderRightButtonIsNotIntersection,
  onDragStart,
  onDragEnd,
  children,
  ...others
}: Props) {
  /** new */
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);

  /** new */
  const [sliderWidth, setSliderWidth] = useState(0);
  const [slidesWidth, setSlidesWidth] = useState(0);

  const animationControls = useAnimationControls();

  const measureWidths = useCallback(() => {
    const sliderW = sliderRef.current?.clientWidth ?? 0;
    const slidesW = Array.from(slidesRef.current?.childNodes ?? []).reduce(
      (acc, node) => acc + (node as HTMLElement).clientWidth,
      0,
    );
    setSliderWidth(sliderW);
    setSlidesWidth(slidesW);
  }, []);

  useResize(measureWidths);

  useEffect(() => {
    measureWidths();
  }, [measureWidths]);

  return (
    <Container {...others}>
      <DragConstraints ref={sliderRef}>
        <Track
          key={v4()}
          ref={slidesRef}
          drag="x"
          animate={animationControls}
          dragElastic={0.2}
          dragConstraints={{
            left: -(slidesWidth - sliderWidth + totalSlidesMarginRight),
            right: 0,
          }}
          dragTransition={{ bounceDamping: 18 }}
          style={{
            ...trackStyle,
            columnGap: `${gap}px`,
          }}
          onDragStart={onDragStart as any}
          onDragEnd={onDragEnd as any}
        >
          {children}
          {renderRightButtonIsNotIntersection && renderRightButtonIsNotIntersection()}
        </Track>
      </DragConstraints>
    </Container>
  );
}

export default memo(Carousel);
