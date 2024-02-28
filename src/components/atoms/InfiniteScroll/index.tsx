import { HTMLProps, useRef } from 'react';

import tw from 'twin.macro';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const Container = tw.div`overflow-y-auto`;

interface InfiniteScrollProps extends HTMLProps<HTMLDivElement> {
  onNext?: () => void;
}

export default function InfiniteScroll({ onNext, children, ...others }: InfiniteScrollProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!endRef.current) return () => {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onNext?.();
      }
    });

    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onNext]);

  return (
    <Container {...others}>
      {children}
      <div tw="[min-height: 1px]" ref={endRef} />
    </Container>
  );
}
