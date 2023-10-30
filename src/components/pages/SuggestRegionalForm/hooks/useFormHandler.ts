/* eslint-disable @typescript-eslint/no-unused-vars */

import { BuyOrRent } from '@/constants/enums';

import { useCallback } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { useRouter } from '@/hooks/utils';

import { FormsInfo, RegionItem } from '../reducer/types';

import useFormDispatch from './useFormDispatch';

import useForm from './useForm';
import usePlatform from './usePlatform';

type MouseClickEvent = React.MouseEvent<HTMLButtonElement> | undefined;

type InputChangeEvent = React.ChangeEvent<HTMLInputElement> | undefined;

type TextAreaEvent = React.FormEvent<HTMLTextAreaElement> | undefined;

export default function useFormHandler() {
  const platform = usePlatform();

  const form = useForm();

  const dispatch = useFormDispatch();

  const router = useRouter(platform?.depth);

  const nextRouter = useNextRouter();

  const handleOpenPopup = useCallback(
    (value: 'bubjungdongChange' | 'buyOrRentChange' | 'isQuit' | 'none') => {
      dispatch?.({ type: 'popup', payLoad: value });
    },
    [dispatch],
  );

  const handleUpdateBubjungdong = useCallback(
    (item: RegionItem) => {
      dispatch?.({ type: 'update_Field', key: 'bubjungdong', payLoad: { name: item.name, code: item.code } });
    },
    [dispatch],
  );

  const handleUpdateRealestateType = useCallback(
    (e: MouseClickEvent) => {
      if (e) {
        const { value } = e.currentTarget;
        dispatch?.({ type: 'update_Field', key: 'realestateType', payLoad: Number(value) });
      }
    },
    [dispatch],
  );

  const handleUpdateBuyOrRent = useCallback(
    (e: MouseClickEvent) => {
      if (e) {
        if (form?.forms && form.forms.length > 1 && form.formData?.buyOrRent) {
          dispatch?.({ type: 'popup', payLoad: 'buyOrRentChange' });
          return;
        }

        const { value } = e.currentTarget;

        if (form?.formData?.buyOrRent !== Number(value)) {
          dispatch?.({ type: 'update_Field', key: 'buyOrRent', payLoad: Number(value) });
          dispatch?.({ type: 'update_Field', key: 'price', payLoad: '' });
          dispatch?.({ type: 'update_Field', key: 'monthlyRentFee', payLoad: '' });
          dispatch?.({ type: 'update_Field', key: 'negotiable', payLoad: false });
        }
      }
    },
    [dispatch, form?.formData?.buyOrRent, form?.forms],
  );

  const handleUpdatePrice = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.target;
        dispatch?.({ type: 'update_Field', key: 'price', payLoad: value });
        dispatch?.({
          type: 'update_Field',
          key: 'emptyTextFields',
          payLoad: { price: false },
        });
      }
    },
    [dispatch],
  );

  const handleMonthlyRentFee = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.target;
        dispatch?.({ type: 'update_Field', key: 'monthlyRentFee', payLoad: value });
      }
    },
    [dispatch],
  );

  const handleUpdateNegotiable = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { checked } = e.target;
        dispatch?.({ type: 'update_Field', key: 'negotiable', payLoad: checked });
      }
    },
    [dispatch],
  );

  const handleUpdatePurpose = useCallback(
    (e: MouseClickEvent) => {
      if (e) {
        const { value } = e.currentTarget;

        if (form?.formData?.purpose !== value) {
          dispatch?.({ type: 'update_Field', key: 'purpose', payLoad: value });

          if (value === '실거주') {
            if (form?.formData?.investAmount) {
              dispatch?.({ type: 'update_Field', key: 'investAmount', payLoad: '' });
            }
          }

          if (value === '투자') {
            if (form?.formData?.moveInDate) {
              dispatch?.({ type: 'update_Field', key: 'moveInDate', payLoad: null });
            }

            if (form?.formData?.moveInDateType) {
              dispatch?.({ type: 'update_Field', key: 'moveInDateType', payLoad: '이전' });
            }
          }
        }
      }
    },
    [
      dispatch,
      form?.formData?.investAmount,
      form?.formData?.moveInDate,
      form?.formData?.moveInDateType,
      form?.formData?.purpose,
    ],
  );

  const handleUpdateInvestAmount = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.target;
        dispatch?.({ type: 'update_Field', key: 'investAmount', payLoad: value });
        dispatch?.({
          type: 'update_Field',
          key: 'emptyTextFields',
          payLoad: { investAmount: false },
        });
      }
    },
    [dispatch],
  );

  const handleUpdateMoveInDate = useCallback(
    (value: Date | null) => {
      dispatch?.({ type: 'update_Field', key: 'moveInDate', payLoad: value });
    },
    [dispatch],
  );

  const handleUpdateMoveInDateType = useCallback(
    (value: string) => {
      dispatch?.({ type: 'update_Field', key: 'moveInDateType', payLoad: value });
    },
    [dispatch],
  );

  const handleUpdateMinArea = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.target;
        dispatch?.({ type: 'update_Field', key: 'minArea', payLoad: value });
      }
    },
    [dispatch],
  );

  const handleUpdateMaxArea = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.target;
        dispatch?.({ type: 'update_Field', key: 'maxArea', payLoad: value });
      }
    },
    [dispatch],
  );

  const handleUpdateDescription = useCallback(
    (e: TextAreaEvent) => {
      if (e) {
        const { value } = e.currentTarget;
        dispatch?.({ type: 'update_Field', key: 'description', payLoad: value });
      }
    },
    [dispatch],
  );

  const handleUpdateInterviewAvailableTime = useCallback(
    (e: InputChangeEvent) => {
      if (e) {
        const { value } = e.currentTarget;
        dispatch?.({ type: 'update_Field', key: 'interviewAvailabletimes', payLoad: value });
      }
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch?.({ type: 'reset' });
  }, [dispatch]);

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
          dispatch?.({ type: 'update_Forms', payLoad: FormsInfo.Option });
          break;

        default:
          break;
      }
    }
  }, [form, dispatch]);

  const handleClosePopup = useCallback(() => {
    dispatch?.({ type: 'popup', payLoad: 'none' });
  }, [dispatch]);

  const handleBubjungdongChangePopup = useCallback(
    (type: 'confirm' | 'close', item?: RegionItem) => {
      if (type === 'confirm' && item) {
        handleUpdateBubjungdong(item);
      }

      handleClosePopup();
    },
    [handleClosePopup, handleUpdateBubjungdong],
  );

  const handleBuyOrRentChangePopup = useCallback(
    (type: 'confirm' | 'close') => {
      if (type === 'confirm') {
        handleReset();
      }

      handleClosePopup();
    },
    [handleClosePopup, handleReset],
  );

  const handleIsQuitPopup = useCallback(
    (type: 'confirm' | 'close') => {
      if (type === 'confirm') {
        nextRouter.back();
      }

      handleClosePopup();
    },
    [handleClosePopup, nextRouter],
  );

  const hanldeClickBack = useCallback(() => {
    if (platform?.platform === 'pc') {
      if (nextRouter?.query?.back) {
        nextRouter.replace(nextRouter.query.back as string);
      }
    } else {
      if (form?.forms.length === 1) {
        nextRouter.back();
      }

      if (form?.forms && form?.forms.length > 1) {
        handleOpenPopup('isQuit');
      }
    }
  }, [platform?.platform, nextRouter, form?.forms, handleOpenPopup]);

  return {
    handleUpdateRealestateType,
    handleUpdateBuyOrRent,
    handleUpdatePrice,
    handleMonthlyRentFee,
    handleUpdateNegotiable,
    handleUpdatePurpose,
    handleUpdateInvestAmount,
    handleUpdateMoveInDate,
    handleUpdateMoveInDateType,
    handleUpdateMinArea,
    handleUpdateMaxArea,
    handleUpdateDescription,
    handleUpdateInterviewAvailableTime,
    
    handleNextForm,
    
    handleOpenPopup,
    
    handleBubjungdongChangePopup,

    handleBuyOrRentChangePopup,

    handleIsQuitPopup,

    hanldeClickBack,
  };
}
