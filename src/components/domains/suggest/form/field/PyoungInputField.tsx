import { memo, useRef, useState } from 'react';

import tw, { theme } from 'twin.macro';

import { motion } from 'framer-motion';

import { ButtonV2 } from '@/components/atoms';

import { Accordion, TextFieldV2 } from '@/components/molecules';

import useSuffixPosition from '@/hooks/useSuffixPosition';

import CloseContained from '@/assets/icons/close_contained.svg';

import { AnimationP } from '../ui/AnimationText';

import FIELD_ID from '../constants/fieldId';

import HELPER_MESSAGE from '../constants/helperMessage';

type PyoungInputFieldProps = {
  isRenderAccordion: boolean;
  isRender: boolean;
  value: string;
  label: string;
  open: boolean;
  disabled: boolean;
  errorMessage: string;
  handleOpen: () => void;
  handleClose: () => void;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleClickAdd: (value: string) => void;
  handleReset: () => void;
};

function PyoungInputField({
  isRenderAccordion,
  isRender,
  value,
  label,
  open,
  disabled,
  errorMessage,
  handleOpen,
  handleClose,
  handleChange,
  handleClickAdd,
  handleReset,
}: PyoungInputFieldProps) {
  const [focus, setFocus] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const suffixRef = useRef<HTMLSpanElement>(null);

  const { suffix, left, top } = useSuffixPosition(inputRef, suffixRef, value, '평');

  if (!isRender) return null;

  if (!isRenderAccordion) {
    return (
      <>
        <TextFieldV2
          variant="outlined"
          tw="w-full"
          onFocus={() => setFocus(true)}
          onBlur={() =>
            setTimeout(() => {
              setFocus(false);
            }, 200)
          }
          hasError={!!errorMessage}
          ref={inputRef}
        >
          <TextFieldV2.Input label={label} value={value} onChange={handleChange} />

          {value && (
            <span ref={suffixRef} tw="text-body_03 absolute" css={{ left: `${left}px`, bottom: top - 2 }}>
              {suffix}
            </span>
          )}

          {value && (
            <TextFieldV2.Trailing tw="flex items-center" as="div">
              {focus && (
                <ButtonV2 variant="ghost" size="small" onClick={handleReset} tw="pr-3">
                  <CloseContained />
                </ButtonV2>
              )}
              <ButtonV2 size="small" disabled={disabled} onClick={() => handleClickAdd(value)}>
                추가
              </ButtonV2>
            </TextFieldV2.Trailing>
          )}
        </TextFieldV2>
        <AnimationP tw="text-body_01 ml-2 mt-1" css={[errorMessage ? tw`text-red-800` : tw`text-gray-700`]}>
          {errorMessage || HELPER_MESSAGE.PYOUNG_INPUT}
        </AnimationP>
      </>
    );
  }

  return (
    <div id={FIELD_ID.PyoungInput} tw="mb-6">
      <Accordion
        onChange={(v) => {
          if (v) {
            handleOpen();
          } else {
            handleClose();
          }
        }}
        expanded={open}
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Accordion.Summary isCustomIcon iconColor={theme`colors.gray.700`} iconWidth={16} tw="hover:bg-white">
            <AnimationP tw="text-body_02 text-gray-700 text-left">직접 입력하여 평수를 추가해보세요!</AnimationP>
          </Accordion.Summary>
        </motion.div>

        <Accordion.Details>
          <TextFieldV2
            variant="outlined"
            tw="w-full mt-4"
            onFocus={() => setFocus(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocus(false);
              }, 200)
            }
            hasError={!!errorMessage}
            ref={inputRef}
          >
            <TextFieldV2.Input label={label} value={value} onChange={handleChange} />

            {value && (
              <span ref={suffixRef} tw="text-body_03 absolute" css={{ left: `${left}px`, bottom: top - 2 }}>
                {suffix}
              </span>
            )}

            {value && (
              <TextFieldV2.Trailing tw="flex items-center" as="div">
                {focus && (
                  <ButtonV2 variant="ghost" size="small" onClick={handleReset} tw="pr-3">
                    <CloseContained />
                  </ButtonV2>
                )}
                <ButtonV2 size="small" disabled={disabled} onClick={() => handleClickAdd(value)}>
                  추가
                </ButtonV2>
              </TextFieldV2.Trailing>
            )}
          </TextFieldV2>

          <AnimationP tw="text-body_01 ml-2 mt-1" css={[errorMessage ? tw`text-red-800` : tw`text-gray-700`]}>
            {errorMessage || HELPER_MESSAGE.PYOUNG_INPUT}
          </AnimationP>
        </Accordion.Details>
      </Accordion>
    </div>
  );
}

export default memo(PyoungInputField);
