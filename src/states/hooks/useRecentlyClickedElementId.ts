import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import recentlyClickedElementId from '../atom/recentlyClickedElementId';

export default function useRecentlyClickedElementId() {
  const [state, setState] = useRecoilState(recentlyClickedElementId);

  const handleUpdateRecentlyClickedElementId = useCallback(
    (value?: string) => {
      setState(() => ({
        id: value,
      }));
    },
    [setState],
  );

  const handleResetRecentlyClickedElementId = useCallback(() => {
    setState(() => ({
      id: '',
    }));
  }, [setState]);

  return {
    recenltyClickedElementID: state.id,
    handleUpdateRecentlyClickedElementId,
    handleResetRecentlyClickedElementId,
  };
}
