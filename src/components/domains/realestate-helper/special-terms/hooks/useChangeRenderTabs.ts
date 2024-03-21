import { RefObject, useMemo, useState } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useScroll from '@/hooks/useScroll';

export default function useChangeRenderTabs({ refObj }: { refObj: RefObject<HTMLDivElement> }) {
  const { platform } = useCheckPlatform();

  const [notIsSticky, setNotIsSticky] = useState(true);

  const changeTabRatio = useMemo(() => (platform === 'pc' ? 0.21 : 0.19), [platform]);

  useScroll(refObj, ({ scrollY }) => {
    if (scrollY > changeTabRatio) {
      setNotIsSticky(false);
    } else {
      setNotIsSticky(true);
    }
  });

  return { notIsSticky };
}
