import { apiService } from '@/services';

import { useEffect, useState } from 'react';

import useDanjiDetailStore from './useDanjiDetailStore';

export default function useCheckRecommendationService() {
  const store = useDanjiDetailStore();

  const [isPossibleSuggestService, setIsPossibleRecommendationService] = useState(false);

  useEffect(() => {
    async function isAccessible(code: string) {
      const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: code });

      if (response && response.eligible) {
        setIsPossibleRecommendationService(true);
      } else if (response && !response.eligible) {
        setIsPossibleRecommendationService(false);
      }
    }

    if (store?.danji) {
      const code = store?.danji.bubjungdong_code;

      isAccessible(code);
    }
  }, [store]);

  return { isPossibleSuggestService };
}
