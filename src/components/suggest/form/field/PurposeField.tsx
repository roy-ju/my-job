import { memo } from 'react';

import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import ButtonV2 from '@/components/atoms/ButtonV2';

import FIELD_ID from '../constants/fieldId';

import isEqualValue from '../../utils/isEqualValue';

const PurposeButton = styled(ButtonV2)`
  ${tw`[width: 72px] text-body_02 transition-all duration-300`}
`;

PurposeButton.defaultProps = {
  radius: 'r100',
  size: 'small',
};
type PurposeFieldProps = {
  isRender: boolean;
  purpose: '실거주' | '투자' | '';

  handleClick: (e?: NegocioMouseEvent<HTMLButtonElement>) => void;
};

function PurposeField({ isRender, purpose, handleClick }: PurposeFieldProps) {
  if (!isRender) return null;

  return (
    <div id={FIELD_ID.Purpose} tw="flex flex-row gap-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        <PurposeButton
          variant={isEqualValue(purpose, '실거주') ? 'primary' : 'gray'}
          value="실거주"
          onClick={handleClick}
          selected={isEqualValue(purpose, '실거주')}
        >
          실거주
        </PurposeButton>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        <PurposeButton
          variant={isEqualValue(purpose, '투자') ? 'primary' : 'gray'}
          value="투자"
          onClick={handleClick}
          selected={isEqualValue(purpose, '투자')}
        >
          투자
        </PurposeButton>
      </motion.div>
    </div>
  );
}

export default memo(PurposeField);
