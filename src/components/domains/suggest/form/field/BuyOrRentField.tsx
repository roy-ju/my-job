import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import ButtonV2 from '@/components/atoms/ButtonV2';

import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';

import FIELD_ID from '../constants/fieldId';

import isEqualValue from '../../utils/isEqualValue';

import isNotEqualValue from '../../utils/isNotEqualValue';

const BuyOrRentButton = styled(ButtonV2)`
  ${tw`[width: 72px] text-body_02 transition-all duration-300`}
`;

BuyOrRentButton.defaultProps = {
  radius: 'r100',
  size: 'small',
};

type BuyOrRentFieldProps = {
  isStyleChange: boolean;
  needDiabledFields?: boolean;
  buyOrRent: BuyOrRent | 0;
  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function BuyOrRentField({ isStyleChange, needDiabledFields = false, buyOrRent, handleClick }: BuyOrRentFieldProps) {
  return (
    <div id={FIELD_ID.BuyOrRent} tw="flex flex-row gap-2 pb-4" css={[isStyleChange ? tw`pt-0` : tw`pt-6`]}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        css={[
          needDiabledFields && tw`pointer-events-none`,
          isNotEqualValue(buyOrRent, BuyOrRent.Buy) && needDiabledFields && tw`hidden`,
        ]}
      >
        <BuyOrRentButton
          variant={isEqualValue(buyOrRent, BuyOrRent.Buy) ? 'primary' : 'gray'}
          value={BuyOrRent.Buy}
          onClick={handleClick}
          selected={isEqualValue(buyOrRent, BuyOrRent.Buy)}
        >
          {describeJeonsaeWolsaeSame(BuyOrRent.Buy)}
        </BuyOrRentButton>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        css={[
          needDiabledFields && tw`pointer-events-none`,
          isEqualValue(buyOrRent, BuyOrRent.Buy) && needDiabledFields && tw`hidden`,
        ]}
      >
        <BuyOrRentButton
          variant={isEqualValue(buyOrRent, BuyOrRent.Jeonsae) ? 'primary' : 'gray'}
          value={BuyOrRent.Jeonsae}
          onClick={handleClick}
          selected={isEqualValue(buyOrRent, BuyOrRent.Jeonsae)}
        >
          {describeJeonsaeWolsaeSame(BuyOrRent.Jeonsae)}
        </BuyOrRentButton>
      </motion.div>
    </div>
  );
}

export default memo(BuyOrRentField);
