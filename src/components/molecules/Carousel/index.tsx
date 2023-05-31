import {
  CSSProperties,
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactElement,
  useCallback,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { styled } from 'twin.macro';
import { unRef } from '@/utils/unRef';
import { useIsomorphicLayoutEffect } from '@/hooks/utils';
import { getTranslateX } from './utils';

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

interface ControlProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface Props extends ComponentPropsWithoutRef<'div'> {
  trackStyle?: CSSProperties;

  gap?: number;

  renderLeftButton?: (props: ControlProps) => ReactElement;
  renderRightButton?: (props: ControlProps) => ReactElement;
}

export default function Carousel({
  gap = 0,

  trackStyle,
  renderLeftButton,
  renderRightButton,
  onDragStart,
  onDragEnd,
  children,
  ...others
}: Props) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [x, setX] = useState(0);

  const [firstItemInterecting, setFirstItemIntersecting] = useState(true);

  const [lastItemIntersecting, setLastItemIntersecting] = useState(true);

  const handleClickLeft = useCallback(() => {
    const track = unRef(trackRef);

    if (!track) return;

    const childrenCount = track.children.length;

    if (!childrenCount) return;

    const itemWidth = track.children[0].getBoundingClientRect().width;

    const currentX = getTranslateX(track.style.transform);

    const index = Math.round(currentX / -(itemWidth + gap));

    const translateX = (index - 1) * -(itemWidth + gap);

    setX(Math.min(0, translateX));
  }, [gap]);

  const handleClickRight = useCallback(() => {
    const track = unRef(trackRef);
    const constraints = unRef(constraintsRef);

    if (!track || !constraints) return;

    const childrenCount = track.children.length;

    if (!childrenCount) return;

    const itemWidth = track.children[0].getBoundingClientRect().width;

    const trackWidth = track.getBoundingClientRect().width;
    const currentX = getTranslateX(track.style.transform);

    const index = Math.round(currentX / -(itemWidth + gap));

    const translateX = (index + 1) * -(itemWidth + gap);

    const constraintsWidth = constraints.getBoundingClientRect().width;

    setX(Math.max(translateX, constraintsWidth - trackWidth));
  }, [gap]);

  useIsomorphicLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.ariaLabel === 'firstItem') {
            setFirstItemIntersecting(entry.isIntersecting);
          }

          if (entry.target.ariaLabel === 'lastItem') {
            setLastItemIntersecting(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.9 },
    );

    const track = unRef(trackRef);

    const firstChild = track?.children[0];
    const lastChild = track?.children[(track?.children.length ?? 0) - 1];

    if (firstChild) {
      firstChild.ariaLabel = 'firstItem';
      observer.observe(firstChild);
    }
    if (lastChild) {
      lastChild.ariaLabel = 'lastItem';
      observer.observe(lastChild);
    }

    return () => observer.disconnect();
  }, [children]);

  return (
    <Container {...others}>
      {renderLeftButton && !firstItemInterecting && renderLeftButton({ onClick: handleClickLeft })}
      {renderRightButton && !lastItemIntersecting && renderRightButton({ onClick: handleClickRight })}
      <DragConstraints ref={constraintsRef}>
        <Track
          ref={trackRef}
          dragConstraints={constraintsRef}
          drag="x"
          animate={{ x }}
          transition={{
            x: { type: 'spring', mass: 0.5, stiffness: 500, damping: 50 },
          }}
          style={{
            ...trackStyle,
            columnGap: `${gap}px`,
          }}
          onDragStart={onDragStart as any}
          onDragEnd={onDragEnd as any}
        >
          {children}
        </Track>
      </DragConstraints>
    </Container>
  );
}
