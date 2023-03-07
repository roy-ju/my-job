import { useControlled, useOutsideClick } from '@/hooks/utils';
import React, { useCallback, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import ChevronDownIcon from '@/assets/icons/chevron_down.svg';
import tw, { styled, theme } from 'twin.macro';
import CheckIcon from '@/assets/icons/check.svg';

const SelectButton = styled.button`
  ${tw`inline-flex items-center justify-between w-[119px] h-10 px-4 bg-white rounded-lg shadow`}
  &:hover {
    ${tw`bg-gray-300`}
  }
`;

const SelectItem = styled.button`
  ${tw`flex items-center justify-between w-full h-10 px-4 bg-white text-gray-1000`}
  &:hover {
    ${tw`bg-gray-300`}
  }
`;

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export default function MapPriceSelect({ value: valueProp, onChange }: Props) {
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
  });

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({
    ref: outsideRef,
    handler: () => setIsOpen(false),
  });

  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: 'buy',
  });

  const handleChangeValue = useCallback(
    (newValue: string) => {
      setIsOpen(false);
      setValueState(newValue);
      onChange?.(newValue);
    },
    [setValueState, onChange],
  );

  return (
    <div ref={outsideRef}>
      <SelectButton
        type="button"
        ref={setReferenceElement}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span tw="text-b2 font-bold text-gray-1000">
          {value === 'buy' ? '매매 가격' : '전월세 금액'}
        </span>
        <ChevronDownIcon
          color={theme`colors.gray.1000`}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </SelectButton>
      {isOpen && (
        <div
          tw="w-[119px] mt-2 shadow rounded-lg bg-white flex flex-col py-2"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <SelectItem onClick={() => handleChangeValue('buy')}>
            <span
              css={[
                tw`font-bold text-b2`,
                value === 'buy' && tw`text-nego-1000`,
              ]}
            >
              매매 가격
            </span>
            {value === 'buy' && <CheckIcon color={theme`colors.nego.1000`} />}
          </SelectItem>
          <SelectItem onClick={() => handleChangeValue('rent')}>
            <span
              css={[
                tw`font-bold text-b2`,
                value === 'rent' && tw`text-nego-1000`,
              ]}
            >
              전월세 금액
            </span>
            {value === 'rent' && <CheckIcon color={theme`colors.nego.1000`} />}
          </SelectItem>
        </div>
      )}
    </div>
  );
}
