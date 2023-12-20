import { memo } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/atoms';

type FixedButtonProps = {
  tabIndex?: number;

  handleClickListingButton: () => void;

  handleClickSuggestButton: () => void;
};

function FixedButton({ tabIndex, handleClickListingButton, handleClickSuggestButton }: FixedButtonProps) {
  if (typeof tabIndex !== 'number') return null;

  if (tabIndex < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      tw="flex items-center fixed bottom-0 [z-index: 100000] pt-4 px-5 [padding-bottom: 42px] gap-3 bg-white w-full shadow"
    >
      <Button variant="outlined" tw="flex-1" onClick={handleClickListingButton} size="bigger">
        매물 등록
      </Button>
      <Button tw="flex-1" onClick={handleClickSuggestButton} size="bigger">
        구해요 등록
      </Button>
    </motion.div>
  );
}

export default memo(FixedButton);
