import ApiService from '@/lib/apiService';

import {
  LoginCiRequest,
  LoginCiResponse,
  LoginRequest,
  LoginResponse,
  SendPhoneVerificationCodeForRegisterResponse,
  UpdateCIResponse,
  UserAppVersionResponse,
} from './auth/types';

import {
  MyVerifyAddressRequest,
  MyVerifyAddressResponse,
  MyVerifyOwnershipRequest,
  MyVerifyOwnershipResponse,
  UploadProfileImageResponse,
} from './my/types';

import {
  DanjiDetailResponse,
  DanjiRealPricesPyoungListResponse,
  DanjiSuggestRecommendEligibilityResponse,
} from './danji/types';

import { ListingEligibilityCheckResponse } from './listing/types';

import { SuggestEligibilityCheckResponse } from './suggests/types';

import { UploadDocumentResponse } from './chat/type';
import {
  SubHomeRealestatedocumentDetailResponse,
  SubHomeRealestatedocumentGetRequest,
  SubHomeRealestatedocumentGetResonse,
  SubHomeRealestatedocumentListResponse,
  SubHomeVerifyAddressRequest,
  SubHomeVerifyAddressResponse,
} from './sub-home/types';

export class NegocioApiService extends ApiService {
  /** 로그인  */
  async login(req: LoginRequest) {
    try {
      const { data } = await this.instance.post('/user/login/sns', {
        browser: req.browser,
        ip_address: req.ipAddress,
        device: req.device,
        social_login_type: req.socialLoginType,
        token: req.token,

        // for new registration
        email: req.email,
        marketing: req.marketing,
        name: req.name,
        phone: req.phone,
        signup_source: req.signUpSource,
      });
      return data as LoginResponse;
    } catch (e) {
      return null;
    }
  }

  async updateCi(req: {
    encData: string;
    integrityValue: string;
    kie: string;
    tokenVersionId: string;
    type: number;
  }): Promise<UpdateCIResponse | null> {
    const { data } = await this.instance.post('/user/update/ci', {
      enc_data: req.encData,
      integrity_value: req.integrityValue,
      kie: req.kie,
      token_version_id: req.tokenVersionId,
      type: req.type,
    });
    return data;
  }

  async loginCi(req: LoginCiRequest): Promise<LoginCiResponse | null> {
    const { data } = await this.instance.post('/user/login/ci', {
      enc_data: req.encData,
      integrity_value: req.integrityValue,
      kie: req.kie,
      token_version_id: req.tokenVersionId,
      type: req.type,
    });
    return data;
  }

  async userAppVersion(version_name: string, platform: number) {
    try {
      const { data } = await this.instance.post('/user/appversion/get', { version_name, platform });
      return data as UserAppVersionResponse;
    } catch (e) {
      return null;
    }
  }

  async sendPhoneVerificationCodeForRegister(
    phone: string,
  ): Promise<SendPhoneVerificationCodeForRegisterResponse | null> {
    try {
      const { data } = await this.instance.post('/user/regist/phone/verification/sms', { phone });
      return data as SendPhoneVerificationCodeForRegisterResponse;
    } catch (e) {
      return null;
    }
  }

  async phoneVerificationForRegister(phone: string, code: string): Promise<ErrorResponse | null> {
    try {
      const { data } = await this.instance.post('/user/regist/phone/verify', {
        verification_number: code,
        phone,
      });
      return data as ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async checkNickname(nickname: string): Promise<ErrorResponse | null> {
    try {
      const { data } = await this.instance.post('/user/checknickname', { nickname });
      return data;
    } catch (e) {
      return null;
    }
  }

  async deleteFcmToken(data: { token: string }): Promise<ErrorResponse | null> {
    try {
      return await this.instance.post('/user/delete/fcmtoken', data);
    } catch (e) {
      return null;
    }
  }

  async updateFcmToken(data: { token: string; device_id: string }): Promise<ErrorResponse | null> {
    try {
      return await this.instance.post('/user/update/fcmtoken', data);
    } catch (e) {
      return null;
    }
  }

  async sendPhoneVerificationCode(phone: string) {
    try {
      return await this.instance.post('/user/phone/verification/sms', { phone });
    } catch (e) {
      return null;
    }
  }

  async updateEmail(token: string, socialLoginType: number) {
    try {
      const { data } = await this.instance.post('/my/email/update', { token, social_login_type: socialLoginType });
      return data as ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async updateName(name: string) {
    try {
      const { data } = await this.instance.post('/my/name/update', { name });
      return data as ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async updateNickname(nickname: string): Promise<ErrorResponse | null> {
    try {
      const { data } = await this.instance.post('/my/nickname/update', { nickname });
      return data as ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async uploadProfileImage(userID: number, file: File) {
    const formData = new FormData();
    formData.append('user_id', `${userID}`);
    formData.append('files', file);
    try {
      const { data } = await this.instance.post<UploadProfileImageResponse>('my/upload/profileimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data as UploadProfileImageResponse;
    } catch (e) {
      return null;
    }
  }

  async deregister(reasons: string) {
    try {
      await this.instance.post('/my/user/deregister', { reasons });
      return true;
    } catch (e) {
      return false;
    }
  }

  async updatePhone(phone: string, code: string) {
    try {
      const { data } = await this.instance.post('/my/phone/update', { phone, verification_number: code });
      return data as ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async serviceQnaCreate(message: string) {
    try {
      return await this.instance.post(`/my/serviceqna/create`, { message });
    } catch (e) {
      return null;
    }
  }

  async deleteMyListing({ listing_id }: { listing_id: number }) {
    try {
      await this.instance.post('my/listing/delete', { listing_id });
      return null;
    } catch (e) {
      return null;
    }
  }

  async mySuggestDelete({ suggestID }: { suggestID: number }): Promise<void> {
    await this.instance.post('/my/suggest/delete', { suggest_id: suggestID });
  }

  async mySuggestSuggestorComplete({
    suggest_id,
    recommender_id,
    is_recommender_agent,
  }: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }): Promise<void> {
    await this.instance.post('/my/suggest/suggestor/complete', {
      suggest_id,
      recommender_id,
      is_recommender_agent,
    });
  }

  async mySuggestRecommendAccept({
    suggest_id,
    recommender_id,
    is_recommender_agent,
  }: {
    suggest_id: number;
    recommender_id: number;
    is_recommender_agent: boolean;
  }) {
    await this.instance.post('/my/suggest/recommend/accept', { suggest_id, recommender_id, is_recommender_agent });
  }

  async mySuggestRecommendNotIntersted({ id }: { id: number }) {
    await this.instance.post('/my/suggest/recommend/notinterested', { suggest_recommend_id: id });
  }

  async mySuggestRecommendCancel(suggestRecommendID: number) {
    try {
      return await this.instance.post('/my/suggest/recommend/cancel', { suggest_recommend_id: suggestRecommendID });
    } catch {
      return null;
    }
  }

  async mySuggestStop({ suggestID }: { suggestID: number }) {
    await this.instance.post('/my/suggest/stop', { suggest_id: suggestID });
  }

  async mySuggsetResume({ suggestID }: { suggestID: number }) {
    await this.instance.post('/my/suggest/resume', { suggest_id: suggestID });
  }

  async myVerifyAddress(req: MyVerifyAddressRequest) {
    try {
      const { data } = await this.instance.post('/my/verifyaddress', req);
      return data as MyVerifyAddressResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async myVerifyOwnership(req: MyVerifyOwnershipRequest) {
    try {
      const { data } = await this.instance.post('/my/verifyownership', req);
      return data as MyVerifyOwnershipResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async addListingFavorite({ listing_id }: { listing_id: number }) {
    try {
      await this.instance.post('/listing/favorite/add', { listing_id });
      return null;
    } catch (e) {
      return null;
    }
  }

  async removeListingFavorite({ listing_id }: { listing_id: number }) {
    try {
      await this.instance.post('/listing/favorite/remove', { listing_id });
      return null;
    } catch (e) {
      return null;
    }
  }

  /** 단지 정보 */
  async getDanjiDetail({ id }: { id: number }): Promise<DanjiDetailResponse | null> {
    try {
      const { data } = await this.instance.post('/danji/detail', { danji_id: id });

      return data;
    } catch (e) {
      return null;
    }
  }

  /** 단지 상세 좋아요 */
  async addDanjiFavorite({ id, type }: { id: number; type?: number }): Promise<void | null> {
    try {
      return await this.instance.post('/danji/favorite/add', { danji_id: id, realestate_type: type });
    } catch (e) {
      return null;
    }
  }

  /** 단지 상세 좋아요 취소 */
  async removeDanjiFavorite({ id, type }: { id: number; type?: number }): Promise<void | null> {
    try {
      return await this.instance.post('/danji/favorite/remove', { danji_id: id, realestate_type: type });
    } catch (e) {
      return null;
    }
  }

  /** 단지 평형정보 불러오기 */
  async getDanjiPyoungList({
    danjiId,
    realestateType,
    buyOrRent,
  }: {
    danjiId?: number;
    realestateType?: number;
    buyOrRent?: number | null;
  }): Promise<DanjiRealPricesPyoungListResponse | null> {
    try {
      const { data } = await this.instance.post('/danji/realprices/pyoung/list', {
        danji_id: danjiId,
        realestateType,
        buyOrRent,
      });

      return data;
    } catch (e) {
      return null;
    }
  }

  /** 단지 추천 가능여부 */
  async danjiSuggestRecommendEligibility({ danji_id }: { danji_id: number }) {
    try {
      const { data } = await this.instance.post('/danji/suggest/recommend/eligibility', {
        danji_id,
      });
      return data as DanjiSuggestRecommendEligibilityResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async listingEligibilityCheck({ id }: { id?: Nullable<number> }): Promise<ListingEligibilityCheckResponse | null> {
    try {
      const { data } = await this.instance.post('/listing/eligibility/check', { danji_id: id });
      return data;
    } catch (e) {
      return null;
    }
  }

  /** 구해요 가능 여부확인 */
  async suggestEligibilityCheck({
    bubjungdong_code,
    id,
  }: {
    bubjungdong_code: string;
    id?: number;
  }): Promise<SuggestEligibilityCheckResponse | null> {
    try {
      const { data } = await this.instance.post('/suggest/eligibility/check', {
        bubjungdong_code,
        danji_id: id,
      });
      return data as SuggestEligibilityCheckResponse;
    } catch (e) {
      return null;
    }
  }

  /** 구해요 지역 생성 */
  async createSuggestRegional(args: any): Promise<void> {
    await this.instance.post('/suggest/regional/create', { ...args });
  }

  /** 구해요 단지 생성 */
  async createSuggestDanji(args: any): Promise<void> {
    await this.instance.post('/suggest/danji/create', { ...args });
  }

  /** 구해요 업데이트 */
  async updateSuggest(args: any): Promise<void> {
    await this.instance.post('/suggest/update', { ...args });
  }

  async suggestRecommendDelete({ suggestRecommendID }: { suggestRecommendID: number }) {
    await this.instance.post('/suggest/recommend/delete', { suggest_recommend_id: suggestRecommendID });
  }

  async suggestView(req: {
    suggest_id: number;
    ip_address: string;
    device: string;
    browser: string;
  }): Promise<ErrorResponse | null> {
    try {
      const { data } = await this.instance.post('/suggest/view', req);
      return data;
    } catch (e) {
      return null;
    }
  }

  async closeChatRoom(chatRoomID: number) {
    try {
      const { data } = await this.instance.post('/chat/room/close', {
        chat_room_id: chatRoomID,
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async chatUploadPhotos(file: File): Promise<UploadDocumentResponse | null> {
    const formData = new FormData();
    formData.append('files', file);
    try {
      const { data } = await this.instance.post('/chat/upload/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data as UploadDocumentResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async updateChatMessagesRead(chatRoomID: number) {
    try {
      return await this.instance.post('/chat/messages/read', { chat_room_id: chatRoomID });
    } catch (e) {
      return null;
    }
  }

  async listingReportCreate(req: { chat_room_id: number; message: string }) {
    try {
      const { data } = await this.instance.post('/listing/report/create', {
        ...req,
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async chatRoomReopen(chatRoomID: number) {
    try {
      const { data } = await this.instance.post('/chat/room/reopen', {
        chat_room_id: chatRoomID,
      });
      return data;
    } catch (e) {
      return null;
    }
  }

  async deleteNotifications(ids: string) {
    try {
      return await this.instance.post('/notification/delete', { ids });
    } catch (e) {
      return null;
    }
  }

  async readNotifications() {
    try {
      return await this.instance.post('/notification/read');
    } catch (e) {
      return null;
    }
  }

  async fetchNotificationUrl(id: number) {
    try {
      return await this.instance.post('/notification/url', {
        notification_id: id,
      });
    } catch (e) {
      return null;
    }
  }

  async updateNotificationConfig(notification: string, isOn: boolean) {
    try {
      return await this.instance.post(`/notification/config/${notification}`, { notification_on: isOn });
    } catch (e) {
      return null;
    }
  }

  async subhomeVerifyAddress(req: SubHomeVerifyAddressRequest) {
    try {
      const { data } = await this.instance.post('/subhome/verifyaddress', req);
      return data as SubHomeVerifyAddressResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async subhomeRealestatedocumentGet(req: SubHomeRealestatedocumentGetRequest) {
    try {
      const { data } = await this.instance.post('/subhome/realestatedocument/get', req);
      return data as SubHomeRealestatedocumentGetResonse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async subHomeRealestateDocumentList() {
    try {
      const { data } = await this.instance.post('/subhome/realestatedocument/list');
      return data as SubHomeRealestatedocumentListResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async subHomeRealestateDocumentDetail({ id }: { id: number }) {
    try {
      const { data } = await this.instance.post('/subhome/realestatedocument/detail', {
        user_realestate_history_id: id,
      });
      return data as SubHomeRealestatedocumentDetailResponse & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async renewSubhomeRealestatedocument({ id }: { id: number }) {
    try {
      const { data } = await this.instance.post('/subhome/realestatedocument/renew', {
        user_realestate_history_id: id,
      });
      return data as { user_realestate_document_history_id: number } & ErrorResponse;
    } catch (e) {
      return null;
    }
  }

  async deleteSubhomeRealestatedocument({ id }: { id: number }) {
    try {
      const { data } = await this.instance.post('/subhome/realestatedocument/delete', {
        user_realestate_history_id: id,
      });
      return data as { user_realestate_document_history_id: number } & ErrorResponse;
    } catch (e) {
      return null;
    }
  }
}

export const apiService = new NegocioApiService();
