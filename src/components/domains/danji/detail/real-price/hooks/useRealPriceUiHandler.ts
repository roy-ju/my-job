import { useCallback, useState } from 'react';

import { Year } from '@/constants/enums';

export default function useRealPriceUiHandler() {
  const [buyOrRent, setBuyOrRent] = useState<number>();

  const [selectedYear, setSelectedYear] = useState<number>(Year.Three);

  const [selectedArea, setSelectedArea] = useState<string>();

  const [selectedJeonyongArea, setSelectedJeonyongArea] = useState<string>();

  const [selectedJeonyongAreaMin, setSelectedJeonyongAreaMin] = useState<string>();

  const [selectedJeonyongAreaMax, setSelectedJeonyongAreaMax] = useState<string>();

  const [selectedIndex, setSelectedIndex] = useState<number>();

  const [checked, setChecked] = useState<boolean>(false);

  const onChangeBuyOrRent = useCallback((value?: number) => {
    setBuyOrRent(value);
  }, []);

  const onChangeChecked = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const onChangeSelectedYear = useCallback((val: number) => {
    setSelectedYear(val);
  }, []);

  const onChangeSelectedArea = useCallback((val?: string) => {
    setSelectedArea(val);
  }, []);

  const onChangeSelectedJeonyongArea = useCallback((val?: string) => {
    setSelectedJeonyongArea(val);
  }, []);

  const onChangeSelectedJeonyongAreaMin = useCallback((val?: string) => {
    setSelectedJeonyongAreaMin(val);
  }, []);

  const onChangeSelectedJeonyongAreaMax = useCallback((val?: string) => {
    setSelectedJeonyongAreaMax(val);
  }, []);

  const onChangeSelectedIndex = useCallback((val: number) => {
    setSelectedIndex(val);
  }, []);

  return {
    buyOrRent,
    selectedYear,
    selectedArea,
    selectedJeonyongArea,
    selectedJeonyongAreaMax,
    selectedJeonyongAreaMin,
    selectedIndex,
    checked,
    onChangeBuyOrRent,
    onChangeChecked,
    onChangeSelectedYear,
    onChangeSelectedArea,
    onChangeSelectedJeonyongArea,
    onChangeSelectedJeonyongAreaMin,
    onChangeSelectedJeonyongAreaMax,
    onChangeSelectedIndex,
  };
}
