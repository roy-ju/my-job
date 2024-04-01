import { FavoriteDanjiListItem } from '@/services/my/types';

export default function convertedDanjiList(list: FavoriteDanjiListItem[]) {
  return list.map((item) => ({
    danjiId: item.danji_id,
    realestateType: item.realestate_type,
    eubmyundong: item.eubmyundong,
    danjiName: item.danji_name,
    roadNameAddress: item.road_name_address,
    totalSaedaeCount: item.total_saedae_count,
    year: item.year,
    month: item.month,
    day: item.day,
    jeonyongMin: item.jeonyong_min,
    jeonyongMax: item.jeonyong_max,
    buyCount: item.buy_count,
    jeonsaeCount: item.jeonsae_count,
    wolsaeCount: item.wolsae_count,
    isFavorite: item.is_favorite,
    dongCount: item.dong_count,
  }));
}
