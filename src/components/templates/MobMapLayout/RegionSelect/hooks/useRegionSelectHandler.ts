import { useCallback, useState, MouseEvent, useEffect } from 'react';

import { useFetchDanjiEubmyeondongList } from '@/services/danji/useFetchDanjiEubmyeondongList';

import { useFetchDanjiSidoList } from '@/services/danji/useFetchDanjiSidoList';

import { useFetchDanjiSigunguList } from '@/services/danji/useFetchDanjiSigunguList';

export default function useRegionSelectHandler(code?: string) {
  const [sidoCode, setSidoCode] = useState('');

  const [sigunguCode, setSigunguCode] = useState('');

  const [eubmyeondongCode, setEubmyeondongCode] = useState('');

  const { data: sidoData } = useFetchDanjiSidoList();

  const { data: sigunguData } = useFetchDanjiSigunguList({ sidoCode });

  const { data: eubmyeondongData } = useFetchDanjiEubmyeondongList({ sigunguCode });

  const handleChangeSelectedSido = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSidoCode(e.currentTarget.id);
    }
  }, []);

  const handleChangeNoneSelectedSido = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSidoCode(e.currentTarget.id);
      setSigunguCode('');
      setEubmyeondongCode('');
    }
  }, []);

  const handleChangeSelectedSigungu = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSigunguCode(e.currentTarget.id);
    }
  }, []);

  const handleChangeNoneSelectedSigungu = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setSigunguCode(e.currentTarget.id);
      setEubmyeondongCode('');
    }
  }, []);

  const handleChangeEummyeondong = useCallback((e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      setEubmyeondongCode(e.currentTarget.id);
    }
  }, []);

  useEffect(() => {
    if (code) {
      setSidoCode(code.slice(0, 2));
      setSigunguCode(code.slice(0, 5));
      setEubmyeondongCode(`${code.slice(0, 8)}00`);
    }
  }, [code]);

  useEffect(() => {
    if (!sigunguCode && sigunguData?.list?.[0].code && sigunguData?.list?.[0].name) {
      setSigunguCode(sigunguData?.list?.[0].code);
    }

    if (!eubmyeondongCode && eubmyeondongData?.list?.[0].code && eubmyeondongData?.list?.[0].name) {
      setEubmyeondongCode(eubmyeondongData?.list?.[0].code);
    }
  }, [sigunguCode, eubmyeondongCode, sidoData, sigunguData, eubmyeondongData]);

  return {
    sidoData,
    sigunguData,
    eubmyeondongData,
    sidoCode,
    sigunguCode,
    eubmyeondongCode,
    handleChangeSelectedSido,
    handleChangeNoneSelectedSido,
    handleChangeSelectedSigungu,
    handleChangeNoneSelectedSigungu,
    handleChangeEummyeondong,
  };
}
