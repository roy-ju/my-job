import { motion } from 'framer-motion';

import { Button } from '@/components/atoms';

type FixedButtonProps = {
  tabIndex: number;
  handleClickSuggestButton: () => void;
};

function FixedButton({ tabIndex, handleClickSuggestButton }: FixedButtonProps) {
  if (tabIndex < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      tw="flex items-center fixed bottom-0 [z-index: 100000] py-3 px-5  gap-3 bg-white w-full shadow"
    >
      <Button tw="flex-1" onClick={handleClickSuggestButton} size="bigger">
        구해요 등록
      </Button>
    </motion.div>
  );
}

export default FixedButton;
