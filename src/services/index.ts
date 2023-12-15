import axios from '@/lib/axios';
import { DanjiDetailResponse } from './danji/types';

export default class ApiService {
  private instance = axios;

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
      await this.instance.post('/danji/favorite/add', { danji_id: id });
    } catch (e) {
      return null;
    }
  }

  /** 단지 상세 좋아요 취소 */
  async danjiFavoriteRemove({ id }: { id: number }): Promise<void | null> {
    try {
      await this.instance.post('/danji/favorite/remove', { danji_id: id });
    } catch (e) {
      return null;
    }
  }
}

export const apiService = new ApiService();
