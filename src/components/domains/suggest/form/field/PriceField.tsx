import { memo, useRef, useState } from 'react';

import tw from 'twin.macro';

import { motion } from 'framer-motion';

import { TextFieldV2 } from '@/components/molecules';

import useSuffixPosition from '@/hooks/utils/useSuffixPosition';

import CloseContained from '@/assets/icons/close_contained.svg';

import ErrorIcon from '@/assets/icons/error.svg';

type PriceFieldProps = {
  id: string;
  isRender: boolean;
  price: string;
  label: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
  handleReset: (e?: NegocioMouseEvent<HTMLSpanElement>) => void;
  helperMessage?: string;
  errorMessage?: string;
};

function PriceField({
  id,
  isRender,
  price,
  label,
  errorMessage,
  helperMessage,
  handleChange,
  handleReset,
}: PriceFieldProps) {
  const [focus, setFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const suffixRef = useRef<HTMLSpanElement>(null);

  const { suffix, left, top } = useSuffixPosition(inputRef, suffixRef, price, '만원');

  if (!isRender) return null;

  return (
    <div tw="w-full">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
          <TextFieldV2.Input value={price} onChange={handleChange} label={label} isLabelBottom />

          {price && (
            <span ref={suffixRef} tw="text-body_03 absolute" css={{ left: `${left}px`, top }}>
              {suffix}
            </span>
          )}

          {price && focus && (
            <>
              <TextFieldV2.Trailing
                tw="cursor-pointer"
                onClick={() => handleReset()}
                css={[errorMessage ? tw`pr-3` : tw`pr-4`]}
              >
                <CloseContained />
              </TextFieldV2.Trailing>
            </>
          )}

          {errorMessage && (
            <TextFieldV2.Trailing tw="cursor-pointer pr-4">
              <ErrorIcon />
            </TextFieldV2.Trailing>
          )}
        </TextFieldV2>

        {errorMessage ? (
          <TextFieldV2.ErrorMessage>{errorMessage}</TextFieldV2.ErrorMessage>
        ) : (
          helperMessage && <TextFieldV2.HelperMessage>{helperMessage}</TextFieldV2.HelperMessage>
        )}
      </motion.div>
    </div>
  );
}

export default memo(PriceField);
