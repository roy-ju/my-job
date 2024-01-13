import { useCallback } from 'react';

import { useRecoilState } from 'recoil';

import { TooltipType } from '@/constants/tooltips';

import tooltipAtom from '../atom/tooltip';

export default function useTooltip() {
  const [state, setState] = useRecoilState(tooltipAtom);

  const openTooltip = useCallback(
    (tooltip: TooltipType | '') => {
      setState({
        activeTooltip: tooltip,
      });
    },
    [setState],
  );

  const closeTooltip = useCallback(() => {
    setState({
      activeTooltip: '',
    });
  }, [setState]);

  return {
    activeTooltip: state.activeTooltip,
    openTooltip,
    closeTooltip,
  };
}
