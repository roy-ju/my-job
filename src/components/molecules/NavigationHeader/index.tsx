import React, { useCallback, useRef, useState } from 'react';
import tw from 'twin.macro';
import ChevronLeftIcon from '@/assets/icons/chevron_left_24.svg';
import TripleDotsIcon from '@/assets/icons/triple_dots.svg';
import { usePopper } from 'react-popper';
import { useOutsideClick } from '@/hooks/utils';

const NavigationHeader = tw.div`w-full h-14 bg-white px-4 flex items-center shrink-0`;

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} tw="h-full pr-3">
      <ChevronLeftIcon />
    </button>
  );
}

interface MoreButtonProps {
  items: string[];
  onClickItem?: (index: number, item: string) => void;
}

function MoreButton({ items, onClickItem }: MoreButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const outsideRef = useRef<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
  });

  useOutsideClick({ ref: outsideRef, handler: () => setIsOpen(false) });

  const handleMoreButtonClick = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <button ref={setReferenceElement} type="button" tw="relative h-full ml-auto" onClick={handleMoreButtonClick}>
        <TripleDotsIcon />
      </button>
      {isOpen && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} tw="z-50">
          <div ref={outsideRef} tw="bg-white rounded-lg py-1 flex flex-col shadow">
            {items.map((item, index) => (
              <button
                key={item}
                type="button"
                tw="py-3 px-4 text-b2 leading-4 hover:bg-gray-100"
                onClick={() => {
                  onClickItem?.(index, item);
                  setIsOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const Button = tw.button`relative h-full`;

const Title = tw.div`flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-b1 text-gray-1000 font-bold pt-px pr-1`;

export default Object.assign(NavigationHeader, {
  Title,
  Button,
  BackButton,
  MoreButton,
});
