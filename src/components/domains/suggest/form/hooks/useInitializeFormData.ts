import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import { useSetRecoilState } from 'recoil';

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

  const setBuyOrRent = useSetRecoilState<SuggestForm['buyOrRent']>(SuggestFormSelector('buyOrRent'));

  const setRealestateTypes = useSetRecoilState<SuggestForm['realestateTypes']>(SuggestFormSelector('realestateTypes'));

  useEffect(() => {
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
    } else {
      setStateForms(['region_or_danji']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
}
