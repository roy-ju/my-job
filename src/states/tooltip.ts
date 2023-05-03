import { TooltipType } from '@/constants/tooltips';
import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { v1 } from 'uuid';

interface ITooltipState {
  activeTooltip: TooltipType | '';
}

export const tooltipState = atom<ITooltipState>({
  key: `negocio_tooltip/${v1()}`,
  default: {
    activeTooltip: '',
  },
});

export default function useTooltip() {
  const [state, setState] = useRecoilState(tooltipState);

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
