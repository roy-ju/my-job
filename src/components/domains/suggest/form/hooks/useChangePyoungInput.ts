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

import ERROR_MESSAGE from '../constants/errorMessage';

export default function useChangePyoungInput() {
  const [pyoungInput, setPyoungInput] = useRecoilState<SuggestForm['pyoungInput']>(SuggestFormSelector('pyoungInput'));
  const [pyoungList, setPyoungList] = useRecoilState<SuggestForm['pyoungList']>(SuggestFormSelector('pyoungList'));
  const [errorMessagePyoungInput, setErrorMessagePyoungInput] = useRecoilState<SuggestForm['errorMessagePyoungInput']>(
    SuggestFormSelector('errorMessagePyoungInput'),
  );

  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));
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

  const selectedInputedPyoungList = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      const danjiPyoungList = data?.list?.map((item) => item.gonggeup_pyoung.toString()) ?? [];

      return pyoungList.filter((x) => !danjiPyoungList.includes(x));
    }

    return [];
  }, [danjiOrRegion, data?.list, pyoungList]);

  const isRenderAccordion = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      return (data?.list ?? []).length !== 0;
    }

    return false;
  }, [danjiOrRegion, data?.list]);

  const isRenderPyoungInputField = useMemo(
    () => isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji),
    [danjiOrRegion],
  );

  const isRenderSelectedPyoungList = useMemo(
    () => isRenderPyoungInputField && selectedInputedPyoungList.length > 0,
    [isRenderPyoungInputField, selectedInputedPyoungList.length],
  );

  const pyoungInputLabel = useMemo(() => (pyoungInput ? '평수' : '평수 입력'), [pyoungInput]);

  const disableAddButton = useMemo(() => {
    if (!pyoungInput) {
      return true;
    }

    if (errorMessagePyoungInput) {
      return true;
    }

    return false;
  }, [pyoungInput, errorMessagePyoungInput]);

  const handleOpenAccordion = useCallback(() => {
    setPyoungInputOpen(true);
  }, []);

  const handleCloseAccordion = useCallback(() => {
    setPyoungInputOpen(false);
    setPyoungInput('');
    setErrorMessagePyoungInput('');
  }, [setErrorMessagePyoungInput, setPyoungInput]);

  const handleChangePyoungInputValue = useCallback(
    (e?: NegocioChangeEvent<HTMLInputElement>) => {
      if (e) {
        const input = e.target.value.replace(regNumber, '');

        let numericValue = input ? parseInt(input, 10) : 0;

        if (numericValue > maxPyoung) {
          numericValue = maxPyoung;
          setErrorMessagePyoungInput(ERROR_MESSAGE.MAX_PYOUNG);
        } else {
          setErrorMessagePyoungInput('');
        }

        if (isEqualValue(numericValue, 0)) {
          setPyoungInput('');
          if (forms?.length > 4 && !isRenderAccordion) {
            setErrorMessagePyoungInput(ERROR_MESSAGE.REQUIRE_AREA);
          }
        } else {
          setPyoungInput(numericValue.toString());
        }
      }
    },
    [forms?.length, isRenderAccordion, setErrorMessagePyoungInput, setPyoungInput],
  );

  const handleResetInputValue = useCallback(() => {
    setPyoungInput('');

    if (!isRenderAccordion && forms?.length > 4) {
      if (pyoungList.length > 0) {
        setErrorMessagePyoungInput(ERROR_MESSAGE.REQUIRE_AREA_INPUT);
      } else {
        setErrorMessagePyoungInput('');
      }
    } else {
      setErrorMessagePyoungInput('');
    }
  }, [setPyoungInput, isRenderAccordion, forms?.length, pyoungList.length, setErrorMessagePyoungInput]);

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
      if (isEqualValue(pyoungList.length, 1) && forms?.length > 4 && !isRenderAccordion) {
        setErrorMessagePyoungInput(ERROR_MESSAGE.REQUIRE_AREA_INPUT);
      }

      setPyoungList((prev) => prev.filter((ele) => ele !== value));
    },
    [forms?.length, isRenderAccordion, pyoungList.length, setErrorMessagePyoungInput, setPyoungList],
  );

  return {
    isRenderAccordion,
    isRenderPyoungInputField,
    isRenderSelectedPyoungList,
    pyoungInput,
    pyoungInputLabel,
    pyoungInputOpen,
    selectedInputedPyoungList,
    errorMessagePyoungInput,
    disableAddButton,
    handleOpenAccordion,
    handleCloseAccordion,
    handleChangePyoungInputValue,
    handleClickAddPyoung,
    handleResetInputValue,
    handleClickDeleteAddedPyoung,
  };
}
