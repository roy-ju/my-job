import { State, Action, FormsInfo } from './types';

export const initialState: State = {
  formData: {
    realestateType: [],
    buyOrRent: 0,
    price: '',
    monthlyRentFee: '',
    negotiable: false,
    purpose: '',
    investAmount: '',
    moveInDate: null,
    moveInDateType: '이전',
    minArea: '',
    maxArea: '',
    description: '',
    interviewAvailabletimes: [],
    emptyTextFields: {
      price: false,
      investAmount: false,
    },
  },
  forms: [FormsInfo.BasicInfo],
  popup: 'none',
} as State;

export function suggestFormReducer(state: State, action: Action) {
  switch (action.type) {
    case 'update_Field':
      if (action.key === 'realestateType') {
        const currentValue = state?.formData?.realestateType ?? [];

        const index = currentValue.indexOf(action.payLoad as number);

        let updatedValue;

        if (index > -1) {
          updatedValue = [...currentValue.slice(0, index), ...currentValue.slice(index + 1)] as number[];
        } else {
          updatedValue = [...currentValue, action.payLoad] as number[];
        }

        return {
          ...state,
          formData: {
            ...(state?.formData ?? {}),

            realestateType: updatedValue,
          },
        };
      }

      if (action.key === 'emptyTextFields' && typeof action.payLoad === 'object') {
        return {
          ...state,
          formData: {
            ...state?.formData,

            emptyTextFields: {
              ...state?.formData?.emptyTextFields,
              ...action.payLoad,
            },
          },
        };
      }

      if (action.key === 'interviewAvailabletimes' && typeof action.payLoad === 'string') {
        const currentValue = state?.formData?.interviewAvailabletimes ?? [];

        if (action.payLoad === '시간대 상관 없어요') {
          if (currentValue.includes(action.payLoad)) {
            return {
              ...state,
              formData: {
                ...state.formData,
                interviewAvailabletimes: currentValue.filter((v) => v !== action.payLoad),
              },
            };
          }
          return {
            ...state,
            formData: {
              ...state.formData,
              interviewAvailabletimes: [action.payLoad],
            },
          };
        }

        if (currentValue.includes('시간대 상관 없어요')) {
          return {
            ...state,
            formData: {
              ...state.formData,
              interviewAvailabletimes: [action.payLoad],
            },
          };
        }

        if (currentValue.includes(action.payLoad)) {
          return {
            ...state,
            formData: {
              ...state.formData,
              interviewAvailabletimes: currentValue.filter((v) => v !== action.payLoad),
            },
          };
        }

        return {
          ...state,
          formData: {
            ...state.formData,
            interviewAvailabletimes: [...currentValue, action.payLoad],
          },
        };
      }

      return {
        ...state,
        formData: {
          ...(state?.formData ?? {}),

          [action.key]: action.payLoad,
        },
      };

    case 'update_Forms':
      return {
        ...state,
        forms: [...state.forms, action.payLoad],
      };

    case 'reset':
      return {
        ...initialState,
        formData: {
          bubjungdong: state.formData?.bubjungdong ?? null,
          ...initialState.formData,
        },
      };

    case 'popup':
      return {
        ...state,
        popup: action.payLoad,
      };

    default:
      return state;
  }
}
