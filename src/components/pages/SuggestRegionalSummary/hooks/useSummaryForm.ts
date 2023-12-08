import { useContext } from 'react';

import { SummaryFormContext } from '../provider/SuggestRegionalSummaryProvider';

export default function useSummaryForm() {
  return useContext(SummaryFormContext);
}
