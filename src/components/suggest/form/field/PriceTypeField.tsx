import { memo } from 'react';

import tw from 'twin.macro';

import { motion } from 'framer-motion';

import { Label, Radio } from '@/components/atoms';

import isEqualValue from '../../utils/isEqualValue';

import { AnimationP } from '../ui/AnimationText';

import HELPER_MESSAGE from '../constants/helperMessage';

import FIELD_ID from '../constants/fieldId';

type PriceTypeFieldProps = {
  isRender: boolean;
  quickSale: string;
  handleChange: (e?: NegocioChangeEvent<HTMLInputElement>) => void;
};

function PriceTypeField({ isRender, quickSale, handleChange }: PriceTypeFieldProps) {
  if (!isRender) return null;

  return (
    <div id={FIELD_ID.PriceType} tw="flex flex-col gap-3 " css={[isEqualValue(quickSale, '1') ? tw`pb-0` : tw`pb-4`]}>
      <div tw="flex flex-col gap-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
        >
          <Label
            checked={quickSale === '1'}
            control={<Radio iconBlue />}
            value="1"
            label="급매물 구해요"
            onChange={handleChange}
          />
        </motion.div>
        <AnimationP transition={{ duration: 0.6 }} tw="text-gray-600 text-body_01 pl-7">
          {HELPER_MESSAGE.QUICK_SALE}
        </AnimationP>
      </div>
      <div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
        >
          <Label
            checked={quickSale === '0'}
            control={<Radio iconBlue />}
            value="0"
            label="이 가격에 구해요"
            onChange={handleChange}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default memo(PriceTypeField);
