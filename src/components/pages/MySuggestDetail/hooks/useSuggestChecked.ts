import { resumeSuggest } from '@/apis/suggest/resumeSuggest';
import { stopSuggest } from '@/apis/suggest/stopSuggest';
import { SuggestStatus } from '@/constants/enums';
import { useMemo } from 'react';
import useMySuggestDetailStore from './useMySuggestDetailStore';

export default function useSuggestChecked() {
  const value = useMySuggestDetailStore();

  const suggestId = value?.suggestDetailData?.suggest_id;
  const suggestChecked = useMemo(() => value?.suggestStatus === SuggestStatus.Active, [value]);

  const handleStopSuggest = async () => {
    if (suggestId) {
      await stopSuggest(suggestId);
      value?.mutate();
    }
  };

  const handleResumeSuggest = async () => {
    if (suggestId) {
      await resumeSuggest(suggestId);
      value?.mutate();
    }
  };
  return { suggestChecked, handleResumeSuggest, handleStopSuggest };
}
