import { SuggestsOrListingsState, SuggestsOrListingsStateAction } from '../types';

export const initialState: SuggestsOrListingsState = {
  tab: 1,
  listingsList: { data: [], totalCount: 0 } as unknown as SuggestsOrListingsState['listingsList'],
  suggestsList: { data: [], totalCount: 0 } as unknown as SuggestsOrListingsState['suggestsList'],
} as SuggestsOrListingsState;

export function DanjiSuggestsOrListingsReducer(state: SuggestsOrListingsState, action: SuggestsOrListingsStateAction) {
  switch (action.type) {
    case 'set_tab':
      return { ...state, tab: action.payLoad };

    case 'set_data':
      return {
        ...state,
        listingsList: action.payLoad.listingsList,
        suggestList: action.payLoad.suggestList,
        naverMap: action.payLoad.naverMap,
        recommendationService: action.payLoad.recommendationService,
      };

    default:
      return state;
  }
}
