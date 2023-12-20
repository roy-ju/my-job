import { useCallback, useEffect, useState } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import Routes from '@/router/routes';

import { usePlatform } from '@/providers/PlatformProvider';

import { FormsInfo } from '../types';

import { makeSuggestRegionalParams, errorHandlingWithElement } from '../utils';

import useForm from './useForm';

import useFormDispatch from './useFormDispatch';

export default function useFormCTA() {
  const platform = usePlatform();

  const form = useForm();

  const dispatch = useFormDispatch();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);

  useEffect(() => {
    setNextButtonDisabled(false);

    if (form && form?.forms && form?.formData) {
      const { forms: formList, formData } = form;

      const currentForm = formList[formList.length - 1];

      if (currentForm === FormsInfo.BasicInfo) {
        if (
          !formData?.bubjungdong ||
          !formData?.realestateType ||
          formData?.realestateType?.length === 0 ||
          !formData?.buyOrRent ||
          !formData?.price
        ) {
          setNextButtonDisabled(true);
        }
      }

      if (currentForm === FormsInfo.MoveInDate) {
        if (!formData?.moveInDate) {
          setNextButtonDisabled(true);
        }
      }

      if (currentForm === FormsInfo.Purpose) {
        if (!formData?.purpose) {
          setNextButtonDisabled(true);
        }

        if (formData?.purpose === '투자') {
          if (formData?.investAmount === '') {
            setNextButtonDisabled(true);
          }
        } else if (formData?.purpose === '실거주') {
          if (!formData?.moveInDate) {
            setNextButtonDisabled(true);
          }
        }
      }

      if (currentForm === FormsInfo.Option) {
        if (formData?.realestateType?.includes(RealestateType.Apartment) && (!formData?.minArea || !formData.maxArea)) {
          setNextButtonDisabled(true);
        }
      }

      if (currentForm === FormsInfo.Interview) {
        if (!formData?.interviewAvailabletimes || formData?.interviewAvailabletimes?.length === 0) {
          setNextButtonDisabled(true);
        }
      }
    }
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!form || !form?.forms || !form?.formData) {
      return;
    }

    const { formData, forms } = form;

    // region
    if (!formData?.bubjungdong) {
      errorHandlingWithElement({
        elementID: FormsInfo.BasicInfo,
        errorMessage: '어느 지역을 추천받고 싶은지 선택해주세요.',
      });
      return;
    }

    // // realestate type
    if (!formData?.realestateType || formData?.realestateType.length === 0) {
      errorHandlingWithElement({
        elementID: FormsInfo.BasicInfo,
        errorMessage: '매물의 부동산 종류를 선택해주세요',
      });
      return;
    }

    // // buy or rent
    if (!formData?.buyOrRent) {
      errorHandlingWithElement({
        elementID: FormsInfo.BasicInfo,
        errorMessage: '매물의 거래 종류를 선택해 주세요.',
      });
      return;
    }

    if (formData?.buyOrRent && !formData?.price) {
      errorHandlingWithElement({ elementID: FormsInfo.BasicInfo });
      dispatch?.({ type: 'update_Field', key: 'emptyTextFields', payLoad: { price: true } });
      return;
    }

    if (formData?.purpose === '투자' && !formData?.investAmount) {
      errorHandlingWithElement({ elementID: FormsInfo.Purpose });
      dispatch?.({ type: 'update_Field', key: 'emptyTextFields', payLoad: { investAmount: true } });
      return;
    }

    if (formData?.purpose === '실거주' && !formData?.moveInDate) {
      errorHandlingWithElement({ elementID: FormsInfo.Purpose, errorMessage: '입주 희망일을 선택해 주세요.' });
      return;
    }

    if (formData?.realestateType.includes(RealestateType.Apartment)&& (!formData?.minArea || !formData?.maxArea)) {
      errorHandlingWithElement({ elementID: FormsInfo.Option, errorMessage: '관심있는 평수를 입력해 주세요.' });
      return;
    }

    if (formData?.minArea && formData?.maxArea && Number(formData.minArea) > Number(formData.maxArea)) {
      errorHandlingWithElement({ elementID: FormsInfo.Option, errorMessage: '최소 면적이 최대 면적보다 큽니다.' });
      return;
    }

    if (!formData?.interviewAvailabletimes || formData.interviewAvailabletimes.length === 0) {
      errorHandlingWithElement({ elementID: FormsInfo.Interview, errorMessage: '인터뷰 가능 시간대를 선택해 주세요.' });
      return;
    }

    const params = makeSuggestRegionalParams({
      bubjungdong: formData.bubjungdong,

      realestateType: formData.realestateType,

      buyOrRent: formData.buyOrRent,

      price: formData?.price || '',
      monthlyRentFee: formData?.monthlyRentFee || '',
      negotiable: formData?.negotiable || false,

      purpose: formData?.purpose || '',
      investAmount: formData?.investAmount || '',

      moveInDate: formData?.moveInDate || null,
      moveInDateType: formData?.moveInDateType || '',

      minArea: formData?.minArea || '',
      maxArea: formData?.maxArea || '',

      description: formData?.description || '',
      interviewAvailabletimes: formData?.interviewAvailabletimes || [],
    });

    
    if (platform?.platform === 'pc') {
      router.replace(Routes.SuggestRegionalSummary, {
        searchParams: {
          params: JSON.stringify(params),
          forms: JSON.stringify(forms),
          back: router.asPath,
        },
      });
    } else {
      nextRouter.replace({
        pathname: `/${Routes.EntryMobile}/${Routes.SuggestRegionalSummary}`,
        query: {
          params: JSON.stringify(params),
          forms: JSON.stringify(forms),
          ...(nextRouter?.query?.entry ? { entry: nextRouter.query.entry as string } : {}),
          ...(nextRouter?.query?.origin ? { origin: nextRouter.query.origin as string } : {}),
        },
      });
    }
  }, [dispatch, form, nextRouter, platform?.platform, router]);

  const handleNextForm = useCallback(() => {
    if (form && form?.forms?.length) {
      const formList = form.forms;

      const lastForm = formList[formList.length - 1];

      switch (lastForm) {
        case FormsInfo.BasicInfo:
          if (form?.formData?.buyOrRent === BuyOrRent.Buy) {
            dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.Purpose });
          }

          if (form?.formData?.buyOrRent === BuyOrRent.Jeonsae) {
            dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.MoveInDate });
          }
          break;

        case FormsInfo.MoveInDate:
          dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.Option });
          break;

        case FormsInfo.Purpose:
          dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.Option });
          break;

        case FormsInfo.Option:
          dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.Interview });
          break;

        case FormsInfo.Interview:
          handleSubmit();
          break;

        default:
          break;
      }
    }
  }, [form, dispatch, handleSubmit]);

  return {
    nextButtonDisabled,
    handleNextForm,
  };
}
