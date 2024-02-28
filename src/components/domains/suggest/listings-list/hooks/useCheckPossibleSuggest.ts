import { useEffect, useState } from 'react';

import { apiService } from '@/services';

import { DanjiDetailResponse } from '@/services/danji/types';

export default function useCheckPossibleSuggest({ danji }: { danji: DanjiDetailResponse }) {
  const [isRecommendationService, setIsRecommendationService] = useState(false);

  useEffect(() => {
    async function isAccessible(code: string) {
      const response = await apiService.suggestEligibilityCheck({ bubjungdong_code: code });

      if (response && response.eligible) {
        setIsRecommendationService(true);
      } else if (response && !response.eligible) {
        setIsRecommendationService(false);
      }
    }

    if (danji && danji.bubjungdong_code) {
      isAccessible(danji.bubjungdong_code);
    }
  }, [danji]);

  return { isRecommendationService };
}
