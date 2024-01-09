import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import { useSetRecoilState } from 'recoil';

import { apiService } from '@/services';

import useNormalizeparms from './useNormalizeParams';

import isEqualValue from '../../utils/isEqualValue';

import getNumber from '../../utils/getNumber';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm, { FormType } from '../types';

import SuggestFormState from '../atoms/SuggestFormState';

function propertyToRealestateType(val: string) {
  if (val === '아파트') return 10;
  if (val === '오피스텔') return 20;
  if (val === '빌라' || val === '다세대') return 30;
  if (val === '연립') return 40;
  if (val === '단독') return 50;
  if (val === '다가구') return 60;
  return 0;
}

export default function useInitializeFormData() {
  const router = useRouter();

  const setState = useSetRecoilState(SuggestFormState);

  const { normalizeParams } = useNormalizeparms();

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
      const response = await apiService.fetchDanjiDetail({ id });

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

    if (router?.query?.params && router?.query?.forms) {
      const params: Record<string, unknown> = JSON.parse(router.query.params as string);

      /** 폼 */
      const forms: FormType[] = JSON.parse(router.query.forms as string);

      const normalizedParams = normalizeParams(params);

      // @ts-expect-error
      setState(() => ({
        forms,
        ...normalizedParams,
      }));

      return;
    }

    // 홈에서 들어왔을때
    if (isEqualValue(router?.query?.entry, 'home')) {
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
        const address = router.query.address as string;
        const code = router.query.bcode as string;

        setAddress(address as string);
        setBubjungdong({ name: address, code });
        setStateDanjiOrRegion(DanjiOrRegionalType.Regional);
        setStateForms(['region_or_danji', 'realestate_and_buyOrRent_and_price']);
      } else {
        setStateForms(['region_or_danji']);
      }
    } else if (isEqualValue(router?.query?.entry, 'map')) {
      // 지도에서 들어왔을때

      if (router?.query?.address && router?.query?.bcode) {
        // 주소와 코드가 있으면 지역이라고 하자.
        setStateDanjiOrRegion(DanjiOrRegionalType.Regional);
        const address = router.query.address as string;
        const code = router.query.bcode as string;

        setAddress(address as string);
        setBubjungdong({ name: address, code });
        setStateForms(['region_or_danji', 'realestate_and_buyOrRent_and_price']);
      } else {
        // 없으면 다시 선택해야한다.
        setStateForms(['region_or_danji']);
      }
    } else if (
      isEqualValue(router?.query?.entry, 'danjiDetail') ||
      isEqualValue(router?.query?.entry, 'danjiSuggestListings')
    ) {
      // 단지 상세에서 들어왔을때
      if (router?.query?.danjiID) {
        const danjiID = Number(router.query.danjiID);
        getDanjiDetail({ id: danjiID });
      } else {
        setStateForms(['region_or_danji']);
      }
    } else if (isEqualValue(router?.query?.entry, 'suggestRequestedList')) {
      // 마이페이지 구하기게시내역에서 들어왔을때
      setStateForms(['region_or_danji']);
    } else if (isEqualValue(router?.query?.entry, 'chatRoomList')) {
      // 채팅방에서 들어왔을때
      setStateForms(['region_or_danji']);
    } else {
      // 그외의 경우
      setStateForms(['region_or_danji']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
}
