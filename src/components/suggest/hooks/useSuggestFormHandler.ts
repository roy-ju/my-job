import { useRouter } from 'next/router';

import suggestFormState, {
  BubjungdongType,
  FormType,
  SuggestFormAtomState,
  initialValue,
} from '@/states/suggest/suggestFormState';

import { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';

import { BuyOrRent, DanjiOrRegionalType, RealestateType } from '@/constants/enums';

import useImmerRecoilState from '@/hooks/utils/useImmerRecoilState';

import isEnumValue from '../utils/isEnumValue';

import isEqualValue from '../utils/isEqualValue';

import getIncludeValue from '../utils/getIncludeValue';

export default function useSuggestFormHandler() {
  const router = useRouter();

  const [state, setImmerState] = useImmerRecoilState(suggestFormState);

  const handlePopup = (popup: SuggestFormAtomState['popup']) => {
    // setState((prev) => ({ ...prev, popup }));
    setImmerState((draft) => {
      draft.popup = popup;
    });
  };

  const handleDanjiOrRegion = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      console.log('event');
      const { value } = e.currentTarget;
      if (isEnumValue(Number(value), DanjiOrRegionalType)) {
        const danjiOrRegion = Number(value);

        // setState((prev) => ({
        //   ...prev,
        //   danjiOrRegion,
        //   popup: isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji) ? 'danjiList' : 'regionList',
        // }));
        setImmerState((draft) => {
          draft.danjiOrRegion = danjiOrRegion;
          draft.popup = isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji) ? 'danjiList' : 'regionList';
        });
      }
    }
  };

  const handleAddressAndBubjungdong = async (v: BubjungdongType) => {
    // setState((prev) => ({
    //   ...prev,
    //   address: v.name,
    //   bubjungdong: v,
    //   forms: [...prev.forms, 'realestate_and_buyOrRent_and_price'],
    //   popup: '',
    // }));

    setImmerState((draft) => {
      draft.address = v.name;
      draft.bubjungdong = v;
      draft.forms = [...draft.forms, 'realestate_and_buyOrRent_and_price'];
      draft.popup = '';
    });
  };

  const handleDanji = (v: SearchDanjiResponseItem) => {
    // setState((prev) => ({
    //   ...prev,
    //   danjiID: v.danji_id.toString(),
    //   danjiRealestateType: v.realestate_type,
    //   danjiAddress: v.address,
    //   danjiName: v.name,
    //   forms: [...prev.forms, 'realestate_and_buyOrRent_and_price'],
    //   popup: '',
    //   realestateTypes: [RealestateType.Apartment, RealestateType.Officetel],
    // }));
    setImmerState((draft) => {
      draft.danjiID = v.danji_id.toString();
      draft.danjiRealestateType = v.realestate_type;
      draft.danjiAddress = v.address;
      draft.danjiName = v.name;
      draft.forms = [...draft.forms, 'realestate_and_buyOrRent_and_price'];
      draft.popup = '';
      draft.realestateTypes = [RealestateType.Apartment, RealestateType.Officetel];
    });
  };

  const handleReselectRegionOrDanji = () => {
    // setState((prev) => ({ ...prev, popup: 'reselectRegionOrDanji' }));
    setImmerState((draft) => {
      draft.popup = 'reselectRegionOrDanji';
    });
  };

  const handleConfirmReselectRegionOrDanji = () => {
    const forms = ['region_or_danji'] as FormType[];
    const danjiOrRegion = state.danjiOrRegion;
    const popup = isEqualValue(danjiOrRegion, DanjiOrRegionalType.Danji) ? 'danjiList' : 'regionList';
    const buyOrRent = router?.query?.buyOrRent ? (Number(router?.query?.buyOrRent as string) as BuyOrRent) : 0;

    // setState({
    //   ...initialValue,
    //   forms,
    //   danjiOrRegion,
    //   popup,
    //   buyOrRent,
    // });

    setImmerState((draft) => {
      Object.assign(draft, initialValue);
      draft.forms = forms;
      draft.danjiOrRegion = danjiOrRegion;
      draft.popup = popup;
      draft.buyOrRent = buyOrRent;
    });
  };

  const handleRealestateType = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (isEnumValue(Number(value), RealestateType)) {
        const realestateType = Number(value);

        if (state.realestateTypes.includes(realestateType)) {
          const realestateTypes = state.realestateTypes.filter((ele) => ele !== realestateType);
          // setState((prev) => ({ ...prev, realestateTypes }));
          setImmerState((draft) => {
            draft.realestateTypes = realestateTypes;
          });
        } else {
          // setState((prev) => ({ ...prev, realestateTypes: prev.realestateTypes.concat(realestateType) }));
          setImmerState((draft) => {
            draft.realestateTypes = draft.realestateTypes.concat(realestateType);
          });
        }
      }
    }
  };

  const handleBuyOrRent = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (isEqualValue(Number(value), state.buyOrRent)) {
        return;
      }

      if (isEnumValue(Number(value), BuyOrRent)) {
        const buyOrRent = Number(value);

        // setState((prev) => ({ ...prev, buyOrRent, price: '', monthlyRentFee: '', quickSale: '0' }));
        setImmerState((draft) => {
          draft.buyOrRent = buyOrRent;
          draft.price = '';
          draft.monthlyRentFee = '';
          draft.quickSale = '0';
        });
      }
    }
  };

  const handleQuickSale = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.target;

      if (isEqualValue(value, '0')) {
        // setState((prev) => ({ ...prev, quickSale: '0' }));
        setImmerState((draft) => {
          draft.quickSale = '0';
        });
      }

      if (isEqualValue(value, '1')) {
        // setState((prev) => ({ ...prev, quickSale: '1', price: '', monthlyRentFee: '', negotiable: true }));
        setImmerState((draft) => {
          draft.quickSale = '1';
          draft.price = '';
          draft.monthlyRentFee = '';
          draft.negotiable = true;
        });
      }
    }
  };

  const handleTradeOrDepositPrice = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.target;
      // setState((prev) => ({ ...prev, price: value }));
      setImmerState((draft) => {
        draft.price = value;
      });
    }
  };

  const handleMonthlyRentFee = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.target;
      // setState((prev) => ({ ...prev, monthlyRentFee: value }));
      setImmerState((draft) => {
        draft.monthlyRentFee = value;
      });
    }
  };

  const handleNegotiable = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { checked } = e.target;
      // setState((prev) => ({ ...prev, negotiable: checked }));
      setImmerState((draft) => {
        draft.negotiable = checked;
      });
    }
  };

  const handleResetTradeOrDepositPrice = () => {
    // setState((prev) => ({ ...prev, price: '' }));
    setImmerState((draft) => {
      draft.price = '';
    });
  };

  const handleResetMonthlyRentFee = () => {
    // setState((prev) => ({ ...prev, monthlyRentFee: '' }));
    setImmerState((draft) => {
      draft.monthlyRentFee = '';
    });
  };

  const handleBuyPurpose = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (isEqualValue(Number(value), state.purpose)) {
        return;
      }

      const purpose = value;

      if (isEqualValue(purpose, '실거주') || isEqualValue(purpose, '투자')) {
        const p = purpose as '실거주' | '투자';
        // setState((prev) => ({ ...prev, purpose: p, investAmount: '', moveInDate: null, moveInDateType: '' }));
        setImmerState((draft) => {
          draft.purpose = p;
          draft.investAmount = '';
          draft.moveInDate = null;
          draft.moveInDateType = '';
        });
      }
    }
  };

  const handleMoveInDate = (value: Date | null) => {
    if (isEqualValue(value, state.moveInDate)) {
      return;
    }

    if (value) {
      // setState((prev) => ({ ...prev, moveInDate: value }));
      setImmerState((draft) => {
        draft.moveInDate = value;
      });
    }
  };

  const handleMoveInDateType = (value: string) => {
    if (isEqualValue(value, state.moveInDateType)) {
      return;
    }

    if (getIncludeValue(value, ['이전', '이후', '당일'])) {
      const moveInDateType = value as '이전' | '이후' | '당일';

      // setState((prev) => ({ ...prev, moveInDateType }));
      setImmerState((draft) => {
        draft.moveInDateType = moveInDateType;
      });
    }
  };

  const handleInvestAmount = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.target;
      // setState((prev) => ({ ...prev, investAmount: value }));
      setImmerState((draft) => {
        draft.investAmount = value;
      });
    }
  };

  const handleResetInvestAmount = () => {
    // setState((prev) => ({ ...prev, investAmount: '' }));
    setImmerState((draft) => {
      draft.investAmount = '';
    });
  };

  const handleRegionPyoungs = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (value === '잘 모르겠어요') {
        if (state.pyoungList.includes(value)) {
          const list = state.pyoungList.filter((ele) => ele !== value);
          // setState((prev) => ({ ...prev, pyoungList: list }));
          setImmerState((draft) => {
            draft.pyoungList = list;
          });
        } else {
          // setState((prev) => ({ ...prev, pyoungList: ['잘 모르겠어요'] }));
          setImmerState((draft) => {
            draft.pyoungList = ['잘 모르겠어요'];
          });
        }
      } else {
        const list = state.pyoungList.includes('잘 모르겠어요')
          ? [value]
          : state.pyoungList.includes(value)
          ? state.pyoungList.filter((ele) => ele !== value)
          : [...state.pyoungList, value];

        // setState((prev) => ({ ...prev, pyoungList: list }));
        setImmerState((draft) => {
          draft.pyoungList = list;
        });
      }
    }
  };

  const handleDanjiPyoungs = (e?: NegocioMouseEvent<HTMLButtonElement>) => {
    if (e) {
      const { value } = e.currentTarget;

      if (state.pyoungList.includes(value)) {
        const list = state.pyoungList.filter((ele) => ele !== value);
        // setState((prev) => ({ ...prev, pyoungList: list }));
        setImmerState((draft) => {
          draft.pyoungList = list;
        });
      } else {
        // setState((prev) => ({ ...prev, pyoungList: [...prev.pyoungList, value] }));
        setImmerState((draft) => {
          draft.pyoungList = [...draft.pyoungList, value];
        });
      }
    }
  };

  const handlePyoungInputValue = (e?: NegocioChangeEvent<HTMLInputElement>) => {
    if (e) {
      const { value } = e.target;
      // setState((prev) => ({ ...prev, pyoungInputValue: value }));
      setImmerState((draft) => {
        draft.pyoungInputValue = value;
      });
    }
  };

  const handleResetInputValue = () => {
    // setState((prev) => ({ ...prev, pyoungInputValue: '' }));
    setImmerState((draft) => {
      draft.pyoungInputValue = '';
    });
  };

  const handleAddPyoung = (value: string) => {
    // ToDoLogic
  };

  const handleDeleteAddedPyoung = (value: string) => {
    if (state.pyoungList.includes(value)) {
      const list = state.pyoungList.filter((ele) => ele !== value);
      // setState((prev) => ({ ...prev, pyoungList: list }));
      setImmerState((draft) => {
        draft.pyoungList = list;
      });
    } else {
      // setState((prev) => ({ ...prev, pyoungList: [...prev.pyoungList, value] }));
      setImmerState((draft) => {
        draft.pyoungList = [...draft.pyoungList, value];
      });
    }
  };

  return {
    handleDanjiOrRegion,

    handleRealestateType,
    handleBuyOrRent,
    handleQuickSale,
    handleTradeOrDepositPrice,
    handleMonthlyRentFee,
    handleResetTradeOrDepositPrice,
    handleResetMonthlyRentFee,
    handleNegotiable,

    handleBuyPurpose,

    handleInvestAmount,
    handleResetInvestAmount,

    handleMoveInDate,
    handleMoveInDateType,

    handleRegionPyoungs,
    handleDanjiPyoungs,

    handlePyoungInputValue,
    handleResetInputValue,
    handleAddPyoung,
    handleDeleteAddedPyoung,

    handlePopup,
    handleAddressAndBubjungdong,
    handleDanji,
    handleReselectRegionOrDanji,
    handleConfirmReselectRegionOrDanji,
  };
}
