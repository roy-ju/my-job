import { useCallback } from 'react';

import dynamic from 'next/dynamic';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import { useRouter as useCustormRouter } from '@/hooks/utils';
import { useRouter } from 'next/router';
import SuggestFormSelector from '../form/selector/SuggestFormSelector';

import SuggestForm, { BubjungdongType } from '../form/types';
import QuitConfirmPopup from './QuitConfirmPopup';

const ReselectConfirmPopup = dynamic(() => import('./ReselectConfirmPopup'), { ssr: false });

const RegionListPopup = dynamic(() => import('@/components/organisms/popups/RegionListPopup'), { ssr: false });

const DanjiListPopup = dynamic(() => import('@/components/organisms/popups/DanjiListPopup'), { ssr: false });

type PopupsProps = { depth?: number };

export default function Popups({ depth }: PopupsProps) {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const customRouter = useCustormRouter(depth);

  const [popup, setPopup] = useRecoilState<SuggestForm['popup']>(SuggestFormSelector('popup'));

  const setForms = useSetRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const setAddress = useSetRecoilState<SuggestForm['address']>(SuggestFormSelector('address'));
  const setBubjungdong = useSetRecoilState<SuggestForm['bubjungdong']>(SuggestFormSelector('bubjungdong'));

  const setDanjiID = useSetRecoilState<SuggestForm['danjiID']>(SuggestFormSelector('danjiID'));
  const setDanjiName = useSetRecoilState<SuggestForm['danjiName']>(SuggestFormSelector('danjiName'));
  const setDanjiAddress = useSetRecoilState<SuggestForm['danjiAddress']>(SuggestFormSelector('danjiAddress'));
  const setDanjiRealestateType = useSetRecoilState<SuggestForm['danjiRealestateType']>(
    SuggestFormSelector('danjiRealestateType'),
  );

  const handleUpdatePopup = useCallback(
    (value: SuggestForm['popup']) => {
      setPopup(value);
    },
    [setPopup],
  );

  const handleUpdateAddressAndBubjungdong = useCallback(
    async (v: BubjungdongType) => {
      setAddress(v.name);
      setBubjungdong(v);

      handleUpdatePopup('');

      setForms((prev) => [...prev, 'realestate_and_buyOrRent_and_price']);
    },
    [handleUpdatePopup, setAddress, setBubjungdong, setForms],
  );

  const handleUpdateDanjiInfo = useCallback(
    async (v: SearchDanjiResponseItem) => {
      setDanjiID(v.danji_id.toString());
      setDanjiRealestateType(v.realestate_type);
      setDanjiAddress(v.address);
      setDanjiName(v.name);

      handleUpdatePopup('');

      setForms((prev) => [...prev, 'realestate_and_buyOrRent_and_price']);
    },
    [handleUpdatePopup, setDanjiAddress, setDanjiID, setDanjiName, setDanjiRealestateType, setForms],
  );

  const handleQuitForm = useCallback(() => {
    if (platform === 'pc') {
      router.back();
    }
    if (platform === 'mobile') {
      customRouter.pop();
    }
  }, [customRouter, platform, router]);

  const handleUpdateFormReset = useCallback(() => {
    // TO DO 추가 로직 구현 폼을 초기화 해야함
    setForms(['region_or_danji']);
  }, [setForms]);

  if (popup === 'regionList') {
    return <RegionListPopup onClickClose={() => handleUpdatePopup('')} onSubmit={handleUpdateAddressAndBubjungdong} />;
  }

  if (popup === 'danjiList') {
    return <DanjiListPopup onClickClose={() => handleUpdatePopup('')} onSubmitV2={handleUpdateDanjiInfo} />;
  }

  if (popup === 'reselectRegionOrDanji') {
    return <ReselectConfirmPopup onClickClose={() => handleUpdatePopup('')} onClickComfirm={handleUpdateFormReset} />;
  }

  if (popup === 'quit') {
    return <QuitConfirmPopup onClickClose={() => handleUpdatePopup('')} onClickConfirm={handleQuitForm} />;
  }

  return null;
}
