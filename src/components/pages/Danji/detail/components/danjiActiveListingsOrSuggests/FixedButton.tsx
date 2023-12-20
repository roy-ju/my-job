import { memo } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/atoms';

import useAuth, { User } from '@/hooks/services/useAuth';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

type FixedButtonProps = {
  tabIndex?: number;
  isPossible: boolean;
  handleCreateListing: (user: Nullable<User>, danjiID: number) => Promise<void>;
  handleCreateSuggest: (danjiID: number, isPossible: boolean) => void;
};

function FixedButton({ tabIndex, isPossible, handleCreateListing, handleCreateSuggest }: FixedButtonProps) {
  const store = useDanjiDetailStore();

  const { user: userData } = useAuth();

  const onClickListingCreate = () => {
    if (!store?.danji?.danji_id) return;

    const danjiID = store.danji.danji_id;

    handleCreateListing(userData, danjiID);
  };

  const onClickSuggestCreate = () => {
    if (!store?.danji?.danji_id) return;

    const danjiID = store.danji.danji_id;

    handleCreateSuggest(danjiID, isPossible);
  };

  if (typeof tabIndex !== 'number') return null;

  if (tabIndex < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      tw="flex items-center fixed bottom-0 [z-index: 100000] pt-4 px-5 [padding-bottom: 42px] gap-3 bg-white w-full shadow"
    >
      <Button variant="outlined" tw="flex-1" onClick={onClickListingCreate} size="bigger">
        매물 등록
      </Button>
      <Button tw="flex-1" onClick={onClickSuggestCreate} size="bigger">
        구해요 등록
      </Button>
    </motion.div>
  );
}

export default memo(FixedButton);
