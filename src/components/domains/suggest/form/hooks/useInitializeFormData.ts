import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import { apiService } from '@/services';

import Routes from '@/router/routes';

import isEqualValue from '../../utils/isEqualValue';

import getNumber from '../../utils/getNumber';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm, { FormType } from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

import normalizeParams from '../../utils/normalizeParams';

function propertyToRealestateType(val: string) {
  if (val === '아파트') return RealestateType.Apartment;
  if (val === '오피스텔') return RealestateType.Officetel;
  if (val === '빌라' || val === '다세대') return RealestateType.Dasaedae;
  if (val === '연립') return RealestateType.Yunrip;
  if (val === '단독') return RealestateType.Dandok;
  if (val === '다가구') return RealestateType.Dagagoo;
  return 0;
}

export default function useInitializeFormData() {
  const router = useRouter();

  const [beforePopstateEvent, setBeforePopstateEvent] = useState(false);

  const setState = useSetRecoilState(SuggestFormState);

  const setStateForms = useSetRecoilState<SuggestForm['forms']>(SuggestFormSelector('forms'));
  const setStateDanjiOrRegion = useSetRecoilState<SuggestForm['danjiOrRegion']>(SuggestFormSelector('danjiOrRegion'));
  const setAddress = useSetRecoilState<SuggestForm['address']>(SuggestFormSelector('address'));
  const setBubjungdong = useSetRecoilState<SuggestForm['bubjungdong']>(SuggestFormSelector('bubjungdong'));
  const setStateDanjiID = useSetRecoilState<SuggestForm['danjiID']>(SuggestFormSelector('danjiID'));
  const setStateDanjiAddress = useSetRecoilState<SuggestForm['danjiAddress']>(SuggestFormSelector('danjiAddress'));
  const setStateDanjiName = useSetRecoilState<SuggestForm['danjiName']>(SuggestFormSelector('danjiName'));
  const setStateDanjiRealestateType = useSetRecoilState<SuggestForm['danjiRealestateType']>(
    SuggestFormSelector('danjiRealestateType'),
  );
  const setBuyOrRent = useSetRecoilState<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));
  const setRealestateTypes = useSetRecoilState<SuggestForm['realestateTypes']>(SuggestFormSelector('realestateTypes'));

  useEffect(() => {
    async function getDanjiDetail({ id }: { id: number }) {
      const response = await apiService.getDanjiDetail({ id });

      if (response) {
        setStateDanjiOrRegion(DanjiOrRegionalType.Danji);
        setStateDanjiID(response.danji_id.toString());
        setStateDanjiName(response.name);
        setStateDanjiAddress(response.road_name_address || response.jibun_address || '');
        setStateDanjiRealestateType(response.type);
        setRealestateTypes([response.type]);
        setStateForms(['region_or_danji', 'realestate_and_buyOrRent_and_price']);
      } else {
        setStateForms(['region_or_danji']);
      }
    }

    if (beforePopstateEvent) {
      return;
    }

    if (router?.query?.params && router?.query?.forms) {
      const params: Record<string, unknown> = JSON.parse(router.query.params as string);

      /** 폼 */
      const forms: FormType[] = JSON.parse(router.query.forms as string);

      console.log(params);

      const normalizedParams = normalizeParams(params);

      setState(() => ({
        forms,
        ...normalizedParams,
      }));

      return;
    }

    if (router.query.back) {
      return;
    }

    // 홈에서 들어왔을때
    if (isEqualValue(router?.query?.entry, Routes.Home)) {
      // 매매 전세 월세 바인딩
      const buyOrRent = getNumber(router?.query?.buyOrRent) as BuyOrRent | 0;
      setBuyOrRent(buyOrRent);

      // 부동산 종류 바인딩
      if (isEqualValue(router?.query?.property, '아파트')) {
        const realestateTypes = [RealestateType.Apartment];
        setRealestateTypes(realestateTypes);
      } else if (isEqualValue(router?.query?.property, '오피스텔')) {
        const realestateTypes = [RealestateType.Officetel];
        setRealestateTypes(realestateTypes);
      } else if (router?.query?.property) {
        const realestateTypes = (router?.query?.property as string)
          .split(',')
          .map((item) => propertyToRealestateType(item));
        setRealestateTypes(realestateTypes);
      }

      // 지역과 코드가 있으면 주소와 법정동을 프리필해준다.
      if (router?.query?.address && router?.query?.bcode) {
        const addresses = JSON.parse(router.query.address as string) as string[];
        const codes = JSON.parse(router.query.bcode as string) as string[];

        setAddress(addresses);

        const convertedResult = addresses.map((item, index) => ({
          name: item,
          code: codes[index],
        }));

        setBubjungdong(convertedResult);
        setStateDanjiOrRegion(DanjiOrRegionalType.Regional);
        setStateForms(['region_or_danji', 'realestate_and_buyOrRent_and_price']);
      } else {
        console.log('hi');
        setStateForms(['region_or_danji']);
      }
    } else if (isEqualValue(router?.query?.entry, Routes.Map)) {
      // 지도에서 들어왔을때
      if (router?.query?.address && router?.query?.bcode) {
        // 주소와 코드가 있으면 지역이라고 하자.
        setStateDanjiOrRegion(DanjiOrRegionalType.Regional);
        const address = JSON.parse(router.query.address as string) as string[];
        const code = JSON.parse(router.query.bcode as string) as string[];

        const convertedResult = address.map((item, index) => ({
          name: item,
          code: code[index],
        }));

        setAddress(address);
        setBubjungdong(convertedResult);
        setStateForms(['region_or_danji', 'realestate_and_buyOrRent_and_price']);
      } else {
        // 없으면 다시 선택해야한다.
        setStateForms(['region_or_danji']);
      }
    } else if (
      isEqualValue(router?.query?.entry, Routes.DanjiDetail) ||
      isEqualValue(router?.query?.entry, Routes.SuggestListings)
    ) {
      // 단지 상세에서 들어왔을때
      if (router?.query?.danjiID) {
        const danjiID = Number(router.query.danjiID);
        getDanjiDetail({ id: danjiID });
      } else {
        setStateForms(['region_or_danji']);
      }
    } else {
      // 그외의 경우
      // 마이페이지 구하기게시내역에서 들어왔을때
      // 채팅방에서 들어왔을때
      // 구해요 설명서에서 들어왔을때
      setStateForms(['region_or_danji']);
    }
  }, [
    beforePopstateEvent,
    router,
    setAddress,
    setBubjungdong,
    setBuyOrRent,
    setRealestateTypes,
    setState,
    setStateDanjiAddress,
    setStateDanjiID,
    setStateDanjiName,
    setStateDanjiOrRegion,
    setStateDanjiRealestateType,
    setStateForms,
  ]);

  useEffect(() => {
    let forms = '';

    const handleBeforePopstate = () => {
      if (router?.query?.forms && router?.query?.params) {
        forms = router.query.forms as string;

        const arr = JSON.parse(forms) as FormType[];

        setBeforePopstateEvent(true);

        setStateForms(arr.filter((ele) => ele !== 'summary'));
      }

      return true;
    };

    router.beforePopState(() => handleBeforePopstate());

    return () => {
      router.beforePopState(() => {
        setBeforePopstateEvent(false);
        return true;
      });
    };
  }, [router, setStateForms]);
}
