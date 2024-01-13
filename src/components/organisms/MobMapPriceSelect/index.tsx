import React, { useCallback, useRef, useState } from 'react';

import tw, { styled, theme } from 'twin.macro';

import { usePopper } from 'react-popper';

import useOutsideClick from '@/hooks/useOutsideClick';

import { useControlled } from '@/hooks/utils';

import ChevronDownIcon from '@/assets/icons/chevron_down.svg';

import CheckIcon from '@/assets/icons/check.svg';

import { Filter } from '../MobMapFilter/types';

import { DEPOSIT_STEPS, PRICE_STEPS, RENT_STEPS } from '../MobMapFilter/PriceFilter';

import { getDefaultFilterAptOftl } from '../MobMapFilter';

const SelectButton = styled.button`
  ${tw`inline-flex items-center justify-between w-[105px] h-10 px-3 bg-white rounded-lg shadow transition-colors`}

  /* &:hover {
    ${tw`bg-gray-300`}
  } */

  @media (hover: hover) {
    ${tw`bg-gray-300`}
  }
`;

const SelectItem = styled.button`
  ${tw`flex items-center justify-between w-full h-10 px-3 transition-colors bg-white text-gray-1000`}

  /* &:hover {
    ${tw`bg-gray-300`}
  } */

  @media (hover: hover) {
    ${tw`bg-gray-300`}
  }
`;

interface Props {
  filter?: Filter;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onChangeFilter?: (newFilter: Partial<Filter>) => void;
}

export default function MobMapPriceSelect({
  value: valueProp,
  filter: filterProp,
  disabled = false,
  onChange,
  onChangeFilter,
}: Props) {
  const [_, setFilterState] = useControlled({
    controlled: filterProp,
    default: getDefaultFilterAptOftl(),
  });

  const outsideRef = useRef<HTMLDivElement | null>(null);

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',

    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
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

  // 거래 종류 필터 Change Event Handler
  const handleChangeBuyOrRents = useCallback(
    (newBuyOrRents: string) => {
      setFilterState((prev) => ({
        ...prev,
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
        gapInvestment: false,
        quickSale: false,
      }));

      onChangeFilter?.({
        buyOrRents: newBuyOrRents,
        priceRange: [0, PRICE_STEPS.length - 1],
        depositRange: [0, DEPOSIT_STEPS.length - 1],
        rentRange: [0, RENT_STEPS.length - 1],
        gapInvestment: false,
        quickSale: false,
      });
    },
    [onChangeFilter, setFilterState],
  );

  return (
    <div ref={outsideRef}>
      <SelectButton
        type="button"
        disabled={disabled}
        ref={setReferenceElement}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        css={[disabled && tw`w-fit`]}
      >
        <span tw="text-b2 font-bold text-gray-1000">{value === 'buy' ? '매매 가격' : '전월세 금액'}</span>
        {!disabled && (
          <ChevronDownIcon
            color={theme`colors.gray.1000`}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s',
            }}
          />
        )}
      </SelectButton>
      {isOpen && (
        <div
          tw="w-[105px] shadow rounded-lg bg-white flex flex-col py-2 [z-index: 1000] relative"
          ref={setPopperElement}
          style={{ zIndex: 10000, ...styles.popper }}
          {...attributes.popper}
        >
          <SelectItem
            onClick={() => {
              handleChangeValue('buy');
              handleChangeBuyOrRents('1');
            }}
          >
            <span css={[tw`font-bold text-b2`, value === 'buy' && tw`text-nego-1000`]}>매매 가격</span>
            {value === 'buy' && <CheckIcon color={theme`colors.nego.1000`} />}
          </SelectItem>
          <SelectItem
            onClick={() => {
              handleChangeValue('rent');
              handleChangeBuyOrRents('2,3');
            }}
          >
            <span css={[tw`font-bold text-b2`, value === 'rent' && tw`text-nego-1000`]}>전월세 금액</span>
            {value === 'rent' && <CheckIcon color={theme`colors.nego.1000`} />}
          </SelectItem>
        </div>
      )}
    </div>
  );
}
