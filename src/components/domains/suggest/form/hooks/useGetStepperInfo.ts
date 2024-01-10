import { useRecoilValue } from 'recoil';

import { useMemo } from 'react';

import SuggestFormSelector from '../selector/SuggestFormSelector';

import SuggestForm from '../types';

import makeObject from '../../utils/makeObject';

export default function useGetStepperInfo() {
  const forms = useRecoilValue<SuggestForm['forms']>(SuggestFormSelector('forms'));

  const currentForm = forms[forms.length - 1];

  const stepperInfo = useMemo(() => {
    if (currentForm === 'region_or_danji') {
      return makeObject({
        title: '추천 받고 싶은 위치를 선택해주세요.',
        subTitle: '작성해주신 내용은 중개사님에게 전달됩니다.',
        currentIndex: 0,
        isIcon: false,
      });
    }

    if (currentForm === 'realestate_and_buyOrRent_and_price') {
      return makeObject({
        title: '어떤 거래를 원하시나요?',
        subTitle: '실거래가를 참고해 가격을 제시하면 거래가능성이 높아져요!',
        currentIndex: 1,
        isIcon: false,
      });
    }

    if (currentForm === 'buy_purpose') {
      return makeObject({
        title: '매매 거래의 목적은 무엇인가요?',
        subTitle: '실거주 또는 투자 목적에 따라 추천 매물은 다를 수 있어요.',
        currentIndex: 2,
        isIcon: false,
      });
    }

    if (currentForm === 'move_in_date') {
      return makeObject({
        title: '원하시는 입주 날짜가 어떻게 되세요?',
        subTitle: '확정된 날짜가 아닌, 생각하고 있는 입주 날짜여도 괜찮아요!',
        currentIndex: 2,
        isIcon: false,
      });
    }

    if (currentForm === 'area') {
      return makeObject({
        title: '원하는 평수를 선택해주세요!',
        subTitle: '원하는 평수가 없나요? 그럼 평수를 직접 입력해보세요!',
        currentIndex: 3,
        isIcon: false,
      });
    }

    if (currentForm === 'additional_conditions') {
      return makeObject({
        title: '집 구하기에서 가장 중요한 조건이 있나요?',
        subTitle: '자세할수록 원하는 집을 찾을 확률이 높아져요!',
        currentIndex: 4,
        isIcon: false,
      });
    }

    if (currentForm === 'interview') {
      return makeObject({
        title: '마지막으로 인터뷰 시간대를 선택해주세요!',
        subTitle: '인터뷰 가능한 시간대를 알려주시면 해당 시간대에\n네고시오 전담매니저가 연락드릴 예정이에요.',
        currentIndex: 5,
        isIcon: false,
      });
    }

    if (currentForm === 'summary') {
      return makeObject({
        title: '수고하셨어요!',
        subTitle: '이제 인터뷰 가능한 시간대를 선택해주시면\n네고시오 전담 매니저가 연락드릴 예정이에요!',
        currentIndex: 6,
        isIcon: true,
      });
    }

    return makeObject({ title: '', subTitle: '', currentIndex: 0, isIcon: false });
  }, [currentForm]);

  return stepperInfo;
}
