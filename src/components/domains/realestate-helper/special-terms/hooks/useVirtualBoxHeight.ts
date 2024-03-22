import { useEffect, useState } from 'react';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useViewportHeight from '@/hooks/useViewportHeight';

const MobileDefaultHeight = 275;

const PcDefaultHeight = 450;

export default function useVirtualBoxHeight() {
  const { height } = useViewportHeight();

  const [boxHeight, setBoxHeight] = useState(0);

  const { platform } = useCheckPlatform();

  useEffect(() => {
    const ratio = height / 900;

    const convertedHeight = ratio * PcDefaultHeight;
    setBoxHeight(convertedHeight);
  }, [height]);

  return { boxHeight: platform === 'pc' ? boxHeight : MobileDefaultHeight };
}
