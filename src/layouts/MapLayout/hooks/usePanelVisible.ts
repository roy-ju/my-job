import { useCallback, useState } from 'react';

export default function usePanelVisible() {
  const [panelsVisible, setPanelsVisible] = useState(true);

  const handlePanelsVisible = useCallback((value: boolean) => setPanelsVisible(value), []);

  const togglePanelsVisibility = useCallback(() => setPanelsVisible((prev) => !prev), []);

  return {
    panelsVisible,
    handlePanelsVisible,
    togglePanelsVisibility,
  };
}
