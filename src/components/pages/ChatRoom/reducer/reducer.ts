import { Action, State } from '../types';

export const initialState: State = {
  data: null,
  renderCondition: 'loading',
  photoSending: false,
  chatMessages: [],
  photosUrls: [],
  textFieldDisabled: false,
  popup: '',
} as State;

export function ChatRoomReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set_data':
      return { ...state, data: action.payLoad };

    case 'set_render_condition':
      return { ...state, renderCondition: action.payLoad };

    case 'set_ChatMessages':
      return { ...state, chatMessages: action.payLoad };

    case 'set_PhotosUrls':
      return { ...state, photosUrls: action.payLoad };

    case 'set_TextFieldDisabled':
      return { ...state, textFieldDisabled: action.payLoad };

    case 'set_Popup':
      return { ...state, popup: action.payLoad };

    case 'set_PhotoSending':
      return { ...state, photoSending: action.payLoad };

    default:
      return state;
  }
}
