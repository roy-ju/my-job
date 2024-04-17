import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';

import moveCenterScrollInContainer from '@/utils/moveCenterScrollInContainer';

export default function useScrollSelecetedRef() {
  const selectedRefOne = useRef<HTMLButtonElement | null>(null);
  const selectedRefTwo = useRef<HTMLButtonElement | null>(null);
  const selectedRefThree = useRef<HTMLButtonElement | null>(null);

  const scrollConainerRefOne = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefTwo = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefThree = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (selectedRefOne?.current && scrollConainerRefOne?.current) {
      const container = scrollConainerRefOne.current;
      const element = selectedRefOne.current;

      moveCenterScrollInContainer(element, container);

      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const elementTopRelativeToContainer = elementRect.top - containerRect.top;

      const scrollPosition =
        elementTopRelativeToContainer + container.scrollTop - container.clientHeight / 2 + elementRect.height / 2;

      container.scrollTop = scrollPosition;
    }
  }, [scrollConainerRefOne, selectedRefOne?.current]);

  useIsomorphicLayoutEffect(() => {
    if (selectedRefTwo?.current && scrollConainerRefTwo?.current) {
      const container = scrollConainerRefTwo.current;
      const element = selectedRefTwo.current;

      moveCenterScrollInContainer(element, container);
    }
  }, [scrollConainerRefTwo, selectedRefTwo?.current]);

  useIsomorphicLayoutEffect(() => {
    if (selectedRefThree?.current && scrollConainerRefThree?.current) {
      const container = scrollConainerRefThree.current;
      const element = selectedRefThree.current;

      moveCenterScrollInContainer(element, container);
    }
  }, [scrollConainerRefThree, selectedRefThree?.current]);

  return {
    selectedRefOne,
    selectedRefTwo,
    selectedRefThree,
    scrollConainerRefOne,
    scrollConainerRefTwo,
    scrollConainerRefThree,
  };
}
