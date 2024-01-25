import { LoginResponse } from '@/apis/user/login';
import { NiceResponse } from '@/lib/nice/useNiceId';

export interface NegocioLoginResponseEventPayload extends Partial<LoginResponse> {
  snsToken?: string;
  socialLoginType?: number;
}

export interface NiceIdResponseEventPayload extends Partial<NiceResponse> {}

const Events = {
  NEGOCIO_LOGIN_RESPONSE_EVENT: 'negocio_login_response_event',
  NEGOCIO_UPDATE_EMAIL_RESPONSE_EVENT: 'negocio_update_email_response_event',
  NICE_ID_RESPONSE_EVENT: 'nice_id_response_event',
  NEGOCIO_CREATE_SUGGEST: 'negocio_create_suggest_event',
};

export default Events;
