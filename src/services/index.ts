import ApiService from '@/lib/apiService';

import {
  DanjiDetailResponse,
  DanjiRealPricesPyoungListResponse,
  DanjiSuggestRecommendEligibilityResponse,
} from './danji/types';

import { ListingEligibilityCheckResponse } from './listing/types';

import { SuggestEligibilityCheckResponse } from './suggests/types';

export class NegocioApiService extends ApiService {
  /** 단지 정보 */
  async fetchDanjiDetail({ id }: { id: number }): Promise<DanjiDetailResponse | null> {
    try {
      const { data } = await this.instance.post('/danji/detail', { danji_id: id });

      return data;
    } catch (e) {
      return null;
    }
  }

  /** 단지 상세 좋아요 */
  async danjiFavoriteAdd({ id }: { id: number }): Promise<void | null> {
    try {
      return await this.instance.post('/danji/favorite/add', { danji_id: id });
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

  /** 단지 상세 좋아요 취소 */
  async danjiFavoriteRemove({ id }: { id: number }): Promise<void | null> {
    try {
      return await this.instance.post('/danji/favorite/remove', { danji_id: id });
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

  async mySuggestStop({ suggestID }: { suggestID: number }) {
    await this.instance.post('/my/suggest/stop', { suggest_id: suggestID });
  }

  async mySuggsetResume({ suggestID }: { suggestID: number }) {
    await this.instance.post('/my/suggest/resume', { suggest_id: suggestID });
  }
}

export const apiService = new NegocioApiService();
