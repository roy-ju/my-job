import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { KeyedMutator } from 'swr';

import { isMobile } from '@/utils/is';

import { apiService } from '@/services';

import { SuggestDetailResponse } from '@/services/suggests/types';

export default function useSuggestView({
  suggestID,
  ipAddress,
  detailMutate,
}: {
  suggestID?: number;
  ipAddress?: string;
  detailMutate: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
}) {
  useIsomorphicLayoutEffect(() => {
    async function handleSuggestView() {
      if (!suggestID) return;

      await apiService.suggestView({
        suggest_id: suggestID,
        ip_address: ipAddress !== '::1' ? ipAddress ?? '' : '',
        browser: navigator.userAgent,
        device: isMobile(navigator.userAgent) ? 'MOBILE' : 'PC',
      });

      await detailMutate();

      if (window?.Negocio?.callbacks?.mutateSuggestList) {
        window.Negocio.callbacks.mutateSuggestList();
      }
    }

    handleSuggestView();
  }, []);
}
