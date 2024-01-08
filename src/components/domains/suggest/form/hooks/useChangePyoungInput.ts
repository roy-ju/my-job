import { useCallback, useMemo, useState } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { toast } from 'react-toastify';

import { useFetchDanjiRealPricesPyongList } from '@/services/danji/useFetchDanjiRealPricesPyongList';

import { DanjiOrRegionalType } from '@/constants/enums';

import { regNumber } from '@/utils/regex';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import isEqualValue from '../../utils/isEqualValue';

import maxPyoung from '../constants/maxPyoung';

export default function useChangePyoungInput() {
  const [pyoungInput, setPyoungInput] = useRecoilState<SuggestForm['pyoungInput']>(SuggestFormSelector('pyoungInput'));
  const [pyoungList, setPyoungList] = useRecoilState<SuggestForm['pyoungList']>(SuggestFormSelector('pyoungList'));
  const [errorPyoungInput, setErrorPyoungInput] = useRecoilState<SuggestForm['errorPyoungInput']>(
    SuggestFormSelector('errorPyoungInput'),
  );

  const danjiID = useRecoilValue<SuggestForm['danjiID']>(SuggestFormSelector('danjiID'));
  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const danjiRealestateType = useRecoilValue<SuggestForm['danjiRealestateType']>(
    SuggestFormSelector('danjiRealestateType'),
  );

  const [pyoungInputOpen, setPyoungInputOpen] = useState(false);

  const { data } = useFetchDanjiRealPricesPyongList({
    danjiId: danjiID ? Number(danjiID) : 0,
    realestateType: danjiRealestateType,
    buyOrRent: null,
  });

  const handleOpenAccordion = useCallback(() => {
    setPyoungInputOpen(true);
  }, []);

  const handleCloseAccordion = useCallback(() => {
    setPyoungInputOpen(false);
    setPyoungInput('');
    setErrorPyoungInput(false);
  }, [setErrorPyoungInput, setPyoungInput]);

  const handleChangePyoungInputValue = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const input = e.target.value.replace(regNumber, '');

        let numericValue = input ? parseInt(input, 10) : 0;

        if (numericValue > maxPyoung) {
          numericValue = maxPyoung;

          setErrorPyoungInput(true);
        } else {
          setErrorPyoungInput(false);
        }

        if (numericValue === 0) {
          setPyoungInput('');
        } else {
          setPyoungInput(numericValue.toString());
        }
      }
    },
    [setErrorPyoungInput, setPyoungInput],
  );

  const handleResetInputValue = useCallback(() => {
    setPyoungInput('');
    setErrorPyoungInput(false);
  }, [setPyoungInput, setErrorPyoungInput]);

  const handleClickAddPyoung = useCallback(
    (value: string) => {
      if (!value) return;

      if (pyoungList.includes(value)) {
        toast.error('이미 추가하신 평형입니다.', { toastId: 'toast_already_added_pyoung' });
        setPyoungInput('');
      } else {
        setPyoungList((prev) => [...prev, value]);
        setPyoungInput('');
      }
    },
    [pyoungList, setPyoungInput, setPyoungList],
  );

  const handleClickDeleteAddedPyoung = useCallback(
    (value: string) => {
      setPyoungList((prev) => prev.filter((ele) => ele !== value));
    },
    [setPyoungList],
  );

  const selectedInputedPyoungList = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      const danjiPyoungList = data?.list?.map((item) => item.gonggeup_pyoung.toString()) ?? [];

      return pyoungList.filter((x) => !danjiPyoungList.includes(x));
    }

    return [];
  }, [danjiOrRegion, data?.list, pyoungList]);

  const isRenderPyoungInputField = useMemo(
    () => isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji),
    [danjiOrRegion],
  );

  const isRenderSelectedPyoungList = useMemo(
    () => isRenderPyoungInputField && selectedInputedPyoungList.length > 0,
    [isRenderPyoungInputField, selectedInputedPyoungList.length],
  );

  const pyounInputLabel = useMemo(() => (pyoungInput ? '평수' : '평수 입력'), [pyoungInput]);

  return {
    isRenderPyoungInputField,
    isRenderSelectedPyoungList,
    pyoungInput,
    pyounInputLabel,
    selectedInputedPyoungList,
    pyoungInputOpen,
    errorPyoungInput,
    handleOpenAccordion,
    handleCloseAccordion,
    handleChangePyoungInputValue,
    handleClickAddPyoung,
    handleResetInputValue,
    handleClickDeleteAddedPyoung,
  };
}
