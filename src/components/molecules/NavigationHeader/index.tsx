import { useCallback, useRef, useState } from 'react';

import tw from 'twin.macro';

import { usePopper } from 'react-popper';

import useOutsideClick from '@/hooks/useOutsideClick';

import HeaderChevronLeftIcon from '@/assets/icons/header_chevron_left_24.svg';

import HeaderChevronLeftWhiteIcon from '@/assets/icons/header_chevron_left_white_24.svg';

import TripleDotsIcon from '@/assets/icons/triple_dots.svg';

const NavigationHeader = tw.div`w-full h-14 bg-white px-4 flex items-center shrink-0`;

function BackButton({
  onClick,
  title,
  isHeaderActive = false,
}: {
  onClick?: () => void;
  title?: string;
  isHeaderActive?: boolean;
}) {
  return (
    <button type="button" onClick={onClick} tw="h-full pr-5 flex items-center">
      {isHeaderActive ? <HeaderChevronLeftWhiteIcon tw="text-inherit" /> : <HeaderChevronLeftIcon tw="text-inherit" />}
      {title && <span tw="font-bold [margin-top: 1px]">{title}</span>}
    </button>
  );
}

interface MoreButtonProps {
  type?: 'icon' | 'text';
  text?: string;
  iconColor?: 'dark' | 'light';
  items: string[];
  onClickItem?: (index: number, item: string) => void;
}

function MoreButton({ type = 'icon', text, iconColor = 'dark', items, onClickItem }: MoreButtonProps) {
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
        {type === 'icon' && iconColor === 'light' && <TripleDotsIcon tw="text-white" />}
        {type === 'icon' && iconColor === 'dark' && <TripleDotsIcon />}
        {type === 'text' && text && <span tw="text-body_03 text-gray-800">{text}</span>}
      </button>

      {isOpen && (
        <div ref={setPopperElement} style={{ ...styles.popper }} {...attributes.popper} tw="z-[110] [min-width: 112px]">
          <div
            ref={outsideRef}
            tw="bg-white rounded-lg py-2 flex flex-col border border-gray-300 [box-shadow: 0px 2px 12px 0px #0000001A]"
          >
            {items.map((item, index) => (
              <button
                key={item}
                type="button"
                tw="[padding-top: 13px] [padding-bottom: 13px] px-4 text-body_02 text-gray-1000 hover:bg-nego-100 active:bg-nego-200 disabled:text-gray-500"
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

const Title = tw.div`flex-1 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-heading_01 text-gray-1000 pr-5`;

export default Object.assign(NavigationHeader, {
  Title,
  Button,
  BackButton,
  MoreButton,
});
