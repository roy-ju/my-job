import { Children, HTMLProps, ReactNode, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ChevronDown from '@/assets/icons/chevron_down.svg';
import { usePopper } from 'react-popper';
import { useControlled, useOutsideClick } from '@/hooks/utils';
import { ModifierPhases } from '@popperjs/core';
import tw from 'twin.macro';
import SelectedIcon from '@/assets/icons/selected.svg';
import { motion, AnimatePresence } from 'framer-motion';
import TextField from '../TextField';
import { SizeType, VariantType } from '../TextField/TextFieldContext';
import DropdownContext from './DropdownContext';

const OptionsContainer = tw.div`bg-white rounded-lg py-2 border border-gray-1000`;

const OptionItem = tw.button`w-full text-start flex items-center justify-between py-3 px-4 leading-4 text-b2 hover:bg-gray-200 transition-colors`;

const OptionSmallItem = tw.button`w-full text-start flex items-center justify-between py-2 pl-4 pr-3 leading-4 text-info hover:bg-gray-200 transition-colors`;

interface DropdownProps extends Omit<HTMLProps<HTMLDivElement>, 'size' | 'value' | 'onChange'> {
  placeholder?: string;
  label?: string;
  variant?: VariantType;
  size?: SizeType;
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}

function Dropdown({
  variant = 'outlined',
  size,
  placeholder,
  label,
  value: valueProp,
  onChange,
  children,
  ...others
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const outsideRef = useRef<HTMLDivElement | null>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const [value, setValue] = useControlled({ controlled: valueProp, default: '' });

  const handleValueChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
      setIsOpen(false);
    },
    [setValue, onChange],
  );

  const context = useMemo(
    () => ({
      value,
      onChange: handleValueChange,
    }),
    [value, handleValueChange],
  );

  const modifiers = useMemo(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
        fn({ state }: any) {
          state.styles.popper.width = `${state.rects.reference.width}px`;
        },
        effect({ state }: any) {
          state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
        },
      },
    ],
    [],
  );

  const { styles, attributes, state } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
    modifiers,
  });

  const handleInputClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useOutsideClick({
    ref: outsideRef,
    handler: () => setIsOpen(false),
  });

  return (
    <DropdownContext.Provider value={context}>
      <div ref={outsideRef} {...others}>
        <TextField ref={setReferenceElement} variant={variant} size={size} tw="relative">
          <TextField.Input
            placeholder={placeholder}
            label={label}
            value={value}
            onClick={handleInputClick}
            readOnly
            css={[tw`hover:cursor-pointer`, size === 'small' ? tw`pr-7` : tw`pr-8`]}
          />
          <TextField.Trailing
            css={[tw`absolute right-0 pointer-events-none`, size === 'small' ? tw`pr-3 top-2` : tw`pr-4 top-[20px]`]}
          >
            <ChevronDown
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out',
              }}
            />
          </TextField.Trailing>
        </TextField>
        <AnimatePresence>
          {isOpen && Children.count(children) > 0 && (
            <div ref={setPopperElement} style={{ ...styles.popper, zIndex: 100 }} {...attributes.popper}>
              <motion.div
                style={{ transformOrigin: state?.placement === 'bottom' ? 'top' : 'bottom' }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                transition={{ duration: 0.2 }}
              >
                <OptionsContainer>
                  <div tw="max-h-[400px] overflow-y-auto">{children}</div>
                </OptionsContainer>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DropdownContext.Provider>
  );
}

interface OptionProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | 'onClick'> {
  value: string;
  children?: ReactNode;
}

function Option({ value, children, ...others }: OptionProps) {
  const { value: currentValue, onChange } = useContext(DropdownContext);

  return (
    <OptionItem type="button" {...others} onClick={() => onChange(value)}>
      <div tw="pr-2">{children}</div>
      {value === currentValue && <SelectedIcon tw="shrink-0" />}
    </OptionItem>
  );
}

function OptionSmall({ value, children, ...others }: OptionProps) {
  const { value: currentValue, onChange } = useContext(DropdownContext);

  return (
    <OptionSmallItem type="button" {...others} onClick={() => onChange(value)}>
      <div>{children}</div>
      {value === currentValue && <SelectedIcon tw="shrink-0" />}
    </OptionSmallItem>
  );
}

export default Object.assign(Dropdown, { Option, OptionSmall });
