import React, {
  ChangeEventHandler,
  Children,
  HTMLProps,
  isValidElement,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { usePopper } from 'react-popper';

import useOutsideClick from '@/hooks/useOutsideClick';

import { useControlled } from '@/hooks/utils';

import { ModifierPhases } from '@popperjs/core';

import AutocompleteContext from './AutocompleteContext';

function Popper({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
const AutocompletePopperType = (<Popper />).type;

function getAutocompletePopper(children: ReactNode) {
  const childArray = Children.toArray(children);
  return childArray.filter((child) => isValidElement(child) && child.type === AutocompletePopperType);
}

function getOtherChildren(children: ReactNode) {
  const childArray = Children.toArray(children);
  return childArray.filter((child) => isValidElement(child) && child.type !== AutocompletePopperType);
}

interface AutocompleteProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

function Container({ value: valueProp, onChange, children }: AutocompleteProps) {
  const outsideRef = useRef<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const modifiers = useMemo(
    () => [
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }: any) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`;
        },
        effect({ state }: any) {
          state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`;
        },
      },
    ],
    [],
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e?: any) => {
    setIsOpen(false);
    e?.currentTarget?.blur?.();
  }, []);

  const [value, setValueProp] = useControlled({
    controlled: valueProp,
    default: '',
  });

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setValueProp(e.target.value);
      onChange?.(e);
    },
    [setValueProp, onChange],
  );

  const handleOptionClick = useCallback(
    (v: string) => {
      const event = {
        target: { value: v },
      };
      handleInputChange(event as any);
      handleClose();
    },
    [handleInputChange, handleClose],
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.which !== 229) {
        // Wait until IME settled.
        if (e.key === 'Escape') {
          e.currentTarget.blur();
          handleClose();
        } else if (e.key === 'Enter') {
          e.currentTarget.blur();
          e.currentTarget.form?.requestSubmit();
          handleClose();
        }
      }
    },
    [handleClose],
  );

  const context = useMemo(
    () => ({
      value,
      onChange: handleInputChange,
      onFocus: handleOpen,
      onOptionClick: handleOptionClick,
      onKeyDown: handleKeyDown,
    }),
    [value, handleInputChange, handleOpen, handleOptionClick, handleKeyDown],
  );

  useOutsideClick({
    ref: outsideRef,
    handler: handleClose,
  });

  const otherChildren = getOtherChildren(children);
  const autocompletePopper = getAutocompletePopper(children);

  return (
    <AutocompleteContext.Provider value={context}>
      <div ref={outsideRef}>
        <div ref={setReferenceElement}>{otherChildren}</div>
        {isOpen && (
          <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 100 }} {...attributes.popper}>
            {autocompletePopper}
          </div>
        )}
      </div>
    </AutocompleteContext.Provider>
  );
}

interface OptionProps extends HTMLProps<HTMLButtonElement> {
  value: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Option({ value, onClick, ...others }: OptionProps) {
  const { onOptionClick } = useContext(AutocompleteContext);

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      onOptionClick?.(value);
      onClick?.(e);
    },
    [onOptionClick, onClick, value],
  );

  return <button {...others} onClick={handleClick} type="button" />;
}

export default Object.assign(Container, {
  Popper,
  Option,
});
