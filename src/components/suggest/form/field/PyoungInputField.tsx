import { memo, useState } from 'react';

import { theme } from 'twin.macro';

import { motion } from 'framer-motion';

import { ButtonV2 } from '@/components/atoms';

import { Accordion, TextField } from '@/components/molecules';

import CloseContained from '@/assets/icons/close_contained.svg';

import { AnimationP } from '../ui/AnimationText';

type PyoungInputFieldProps = {
  isRender: boolean;
  value: string;
  label: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleClickAdd: (value: string) => void;
  handleReset: () => void;
};

function PyoungInputField({
  isRender,
  value,
  label,
  handleChange,
  handleClickAdd,
  handleReset,
}: PyoungInputFieldProps) {
  const [focus, setFocus] = useState(false);

  if (!isRender) return null;

  return (
    <div id="pyoung_input_field" tw="mb-6">
      <Accordion>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Accordion.Summary isCustomIcon iconColor={theme`colors.gray.700`} iconWidth={16} tw="hover:bg-white">
            <AnimationP tw="text-body_02 text-gray-700 text-left">직접 입력하여 평수를 추가해보세요!</AnimationP>
          </Accordion.Summary>
        </motion.div>

        <Accordion.Details>
          <TextField
            variant="outlined"
            tw="mt-4"
            nego
            size="xlg"
            onFocus={() => setFocus(true)}
            onBlur={() =>
              setTimeout(() => {
                setFocus(false);
              }, 200)
            }
          >
            <TextField.NumericInput label={label} value={value} onChange={handleChange} />
            {value && focus && (
              <TextField.Trailing tw="flex items-center">
                <ButtonV2 variant="ghost" size="small" onClick={handleReset}>
                  <CloseContained />
                </ButtonV2>
                <ButtonV2 size="small" onClick={() => handleClickAdd(value)}>
                  추가
                </ButtonV2>
              </TextField.Trailing>
            )}
          </TextField>

          <AnimationP tw="text-body_01 text-gray-700 ml-2 mt-1">
            입력하실 수 있는 평수는 최소 1평부터 최대 100평까지입니다.
          </AnimationP>
        </Accordion.Details>
      </Accordion>
    </div>
  );
}

export default memo(PyoungInputField);
