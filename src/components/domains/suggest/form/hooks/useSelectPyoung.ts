import { useCallback, useMemo } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';

import { useFetchDanjiRealPricesPyongList } from '@/services/danji/useFetchDanjiRealPricesPyongList';

import { DanjiOrRegionalType } from '@/constants/enums';

import isNaN from 'lodash/isNaN';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import regionPyoungList from '../constants/regionPyoungList';

import isEqualValue from '../../utils/isEqualValue';

import getIncludeValue from '../../utils/getIncludeValue';

export default function useSelectPyoung({ type = 'create' }: { type: 'create' | 'update' }) {
  const [pyoungList, setPyoungList] = useRecoilState<SuggestForm['pyoungList']>(SuggestFormSelector('pyoungList'));

  const danjiOrRegion = useRecoilValue<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const danjiID = useRecoilValue<SuggestForm['danjiID']>(SuggestFormSelector('danjiID'));
  const danjiRealestateType = useRecoilValue<SuggestForm['danjiRealestateType']>(
    SuggestFormSelector('danjiRealestateType'),
  );

  const { data } = useFetchDanjiRealPricesPyongList({
    danjiId: danjiID ? Number(danjiID) : 0,
    realestateType: danjiRealestateType,
    buyOrRent: null,
  });

  const handleClickRegionPyoung = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (isEqualValue(value, '잘 모르겠어요')) {
          if (pyoungList.includes(value)) {
            setPyoungList((prev) => prev.filter((ele) => ele !== value));
          } else {
            setPyoungList(['잘 모르겠어요']);
          }
        } else {
          const list = pyoungList.includes('잘 모르겠어요')
            ? [value]
            : getIncludeValue(value, pyoungList)
            ? pyoungList.filter((ele) => ele !== value)
            : [...pyoungList, value];

          setPyoungList(list);
        }
      }
    },
    [pyoungList, setPyoungList],
  );

  const handleClickDeleteRegionPyoung = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        setPyoungList((prev) => prev.filter((ele) => ele !== value));
      }
    },
    [setPyoungList],
  );

  const handleClickDanjiPyoung = useCallback(
    (e?: NegocioMouseEvent<HTMLButtonElement>) => {
      if (e) {
        const { value } = e.currentTarget;

        if (pyoungList.includes(value)) {
          setPyoungList((prev) => prev.filter((ele) => ele !== value));
        } else {
          setPyoungList((prev) => [...prev, value]);
        }
      }
    },
    [pyoungList, setPyoungList],
  );

  const list = useMemo(() => {
    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Regional)) {
      if (type === 'update') {
        const pastForwardRegionPyoungList = [...pyoungList].filter((item) => !isNaN(Number(item)));

        return [...regionPyoungList, ...pastForwardRegionPyoungList];
      }
      return regionPyoungList;
    }

    if (isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)) {
      const dataList = data?.list?.filter((item) => item.gonggeup_pyoung !== 0) ?? [];

      return dataList.map((item) => `${item.gonggeup_pyoung}`);
    }

    return [];
  }, [danjiOrRegion, data?.list, pyoungList, type]);

  const isRenderPyoungListField = useMemo(() => Boolean(list.length), [list.length]);

  return {
    isRenderPyoungListField,
    list,
    pyoungList,
    handleClickPyoung: isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji)
      ? handleClickDanjiPyoung
      : handleClickRegionPyoung,
    handleClickDeletePyoung:
      type === 'update' && danjiOrRegion === DanjiOrRegionalType.Regional ? handleClickDeleteRegionPyoung : undefined,
  };
}
