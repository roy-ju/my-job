// import { useMemo } from 'react';

// import { Button } from '@/components/atoms';

// import useDanjiSuggestsOrListingsStore from '../../hooks/useDanjiSuggestsOrListingsStore';

// import useCheckSuggestsOrListings from '../../hooks/useCheckSuggestsOrListings';

// type ViewAllButtonsProps = {
//   handleClickSuggestsButton: () => void;
//   handleClickListingsButton: () => void;
// };

// function ViewAllButtons({ handleClickSuggestsButton, handleClickListingsButton }: ViewAllButtonsProps) {
//   const suggestsOrListingsStore = useDanjiSuggestsOrListingsStore();

//   const { type } = useCheckSuggestsOrListings();

//   const isRender = useMemo(
//     () =>
//       type === 'suggest'
//         ? suggestsOrListingsStore.suggestsList.totalCount > 3
//         : suggestsOrListingsStore.listingsList.totalCount > 3,
//     [type, suggestsOrListingsStore],
//   );

//   if (!isRender) return null;

//   return type === 'suggest' ? (
//     <Button variant="outlined" tw="h-9" onClick={handleClickSuggestsButton}>
//       구해요 전체보기
//     </Button>
//   ) : (
//     <Button variant="outlined" tw="h-9" onClick={handleClickListingsButton}>
//       매물 전체보기
//     </Button>
//   );
// }

// export default ViewAllButtons;

import React from 'react';

export default function ViewAllButtons() {
  return <div>ViewAllButtons</div>;
}
