// import { ReactNode, createContext } from 'react';

// import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

// import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

// import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

// import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

// import { SuggestsOrListingsState, SuggestsOrListingsStateAction } from '../types';

// import useDanjiDetailStore from '../hooks/useDanjiDetailStore';

// export const DanjiSuggestsOrListingsContext = createContext<Nullable<SuggestsOrListingsState>>(null);

// export const DanjiSuggestsOrListingsDispatchContext =
//   createContext<React.Dispatch<SuggestsOrListingsStateAction> | null>(null);

// export default function DanjiSuggestsOrListingsProvider({ children }: { children: ReactNode }) {
//   const store = useDanjiDetailStore();

//   const danjiID = store?.danji?.danji_id;

//   const realestateType = store?.danji?.type;

//   const value = useFetchDanjiDetail({});

//   const listingsListData = useFetchDanjiListingsList({
//     danjiID,
//     realestateType,
//     orderBy: 1,
//     pageSize: 4,
//   });

//   const suggestListsData = useFetchDanjiSuggestsList({
//     danjiID,
//     pageSize: 4,
//   });

//   const { mobileNaverURL, pcNaverURL, isLoading, mutate, error } = useFetchNaverDanji({ id: store?.danji?.danji_id });

//   return <DanjiSuggestsOrListingsContext.Provider value={value}>{children}</DanjiSuggestsOrListingsContext.Provider>;
// }

import React from 'react';

export default function DanjiSuggestsOrListingsProvider() {
  return <div>DanjiSuggestsOrListingsProvider</div>;
}
