import { useEffect } from 'react';

import useRecentlyClickedElementId from '@/states/hooks/useRecentlyClickedElementId';

export default function useRecentlyGoClickedElement() {
  const { recenltyClickedElementID, handleResetRecentlyClickedElementId } = useRecentlyClickedElementId();

  useEffect(() => {
    if (recenltyClickedElementID) {
      const element = document.getElementById(recenltyClickedElementID);

      setTimeout(() => {
        element?.scrollIntoView();

        setTimeout(() => {
          handleResetRecentlyClickedElementId();
        }, 200);
      });
    }
  }, [handleResetRecentlyClickedElementId, recenltyClickedElementID]);
}
