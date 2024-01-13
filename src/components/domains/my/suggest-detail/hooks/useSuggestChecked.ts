import { useMemo } from 'react';

import { apiService } from '@/services';

import { SuggestStatus } from '@/constants/enums';

import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSuggestChecked() {
  const value = useMySuggestDetailStore();

  const suggestID = value?.suggestDetailData?.suggest_id;

  const suggestChecked = useMemo(() => value?.suggestStatus === SuggestStatus.Active, [value]);

  const handleStopSuggest = async () => {
    if (suggestID) {
      await apiService.mySuggestStop({ suggestID });
      value?.mutate();
    }
  };

  const handleResumeSuggest = async () => {
    if (suggestID) {
      await apiService.mySuggsetResume({ suggestID });
      value?.mutate();
    }
  };
  return { suggestChecked, handleResumeSuggest, handleStopSuggest };
}
