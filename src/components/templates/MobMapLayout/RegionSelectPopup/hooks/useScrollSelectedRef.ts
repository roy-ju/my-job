import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export default function useScrollSelecetedRef() {
  const selectedRefOne = useRef<HTMLButtonElement | null>(null);
  const selectedRefTwo = useRef<HTMLButtonElement | null>(null);
  const selectedRefThree = useRef<HTMLButtonElement | null>(null);

  const scrollConainerRefOne = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefTwo = useRef<HTMLDivElement | null>(null);
  const scrollConainerRefThree = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (selectedRefOne?.current && scrollConainerRefOne?.current) {
      const element = selectedRefOne.current;
      const container = scrollConainerRefOne.current;

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
      const element = selectedRefTwo.current;
      const container = scrollConainerRefTwo.current;

      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const elementTopRelativeToContainer = elementRect.top - containerRect.top;

      const scrollPosition =
        elementTopRelativeToContainer + container.scrollTop - container.clientHeight / 2 + elementRect.height / 2;

      container.scrollTop = scrollPosition;
    }
  }, [scrollConainerRefTwo, selectedRefTwo?.current]);

  useIsomorphicLayoutEffect(() => {
    if (selectedRefThree?.current && scrollConainerRefThree?.current) {
      const element = selectedRefThree.current;
      const container = scrollConainerRefThree.current;

      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const elementTopRelativeToContainer = elementRect.top - containerRect.top;

      const scrollPosition =
        elementTopRelativeToContainer + container.scrollTop - container.clientHeight / 2 + elementRect.height / 2;

      container.scrollTop = scrollPosition;
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
