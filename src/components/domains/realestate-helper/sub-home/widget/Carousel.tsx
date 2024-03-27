import { CSSProperties, ComponentPropsWithoutRef, ReactElement, useRef, memo, useState, useEffect } from 'react';

import { styled } from 'twin.macro';

import { motion, useAnimationControls } from 'framer-motion';

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
  const [sliderWidth, setSliderWidths] = useState(0);
  const [slidesWidth, setSlidesWidths] = useState(0);

  const animationControls = useAnimationControls();

  useEffect(() => {
    const measureSliderWidth = () => {
      setSliderWidths(sliderRef?.current?.clientWidth ?? 0);
    };

    const measureSlidesWidth = () => {
      const slidesNode = slidesRef?.current?.childNodes;

      if (slidesNode) {
        const slidesArr = Array.from(slidesNode);

        // @ts-ignore
        const slidesSumWidth = slidesArr.reduce((acc, node) => acc + (node?.clientWidth ?? 0), 0);
        setSlidesWidths(slidesSumWidth);
      }
    };

    measureSliderWidth();
    measureSlidesWidth();

    window.addEventListener('resize', measureSliderWidth);
    window.addEventListener('resize', measureSlidesWidth);

    return () => {
      window.removeEventListener('resize', measureSliderWidth);
      window.removeEventListener('resize', measureSlidesWidth);
    };
  }, [sliderWidth, slidesWidth]);

  return (
    <Container {...others}>
      <DragConstraints ref={sliderRef}>
        <Track
          ref={slidesRef}
          drag="x"
          animate={animationControls}
          dragElastic={0.2}
          // dragConstraints={sliderRef}
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
