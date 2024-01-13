import { atom } from 'recoil';

import { v1 } from 'uuid';

import { TooltipType } from '@/constants/tooltips';

interface TooltipAtom {
  activeTooltip: TooltipType | '';
}

const tooltipAtom = atom<TooltipAtom>({
  key: `tooltipAtom/${v1()}`,
  default: {
    activeTooltip: '',
  },
});

export default tooltipAtom;
