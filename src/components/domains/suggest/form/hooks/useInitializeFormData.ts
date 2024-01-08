import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import { useSetRecoilState } from 'recoil';

import { apiService } from '@/services';

import isEqualValue from '../../utils/isEqualValue';

import getNumber from '../../utils/getNumber';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

export default function useInitializeFormData() {
  const router = useRouter();

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
    // 홈에서 들어왔을때
    if (isEqualValue(router?.query?.entry, 'home')) {
      // 매매 전세 월세 바인딩
      const buyOrRent = getNumber(router?.query?.buyOrRent) as BuyOrRent | 0;

      setBuyOrRent(buyOrRent);

      // 부동산 종류 바인딩
      if (isEqualValue(router?.query?.property, '아파트/오피스텔')) {
        const realestateTypes = [RealestateType.Apartment, RealestateType.Officetel];

        setRealestateTypes(realestateTypes);
      }

      if (isEqualValue(router?.query?.property, '원룸/투룸')) {
        const realestateTypes = [RealestateType.Dasaedae, RealestateType.Dagagoo];

        setRealestateTypes(realestateTypes);
      }

      if (isEqualValue(router?.query?.property, '그외')) {
        const realestateTypes = [RealestateType.Dandok];
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
