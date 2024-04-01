import { RealestateDocumentListItem } from '@/services/sub-home/types';

export default function makeTitle({ item }: { item: RealestateDocumentListItem }) {
  if (item?.danji_name) {
    if (item?.dong && item?.ho) {
      return { firstLine: `${item.danji_name} ${item.dong}동 ${item.ho}호`, secondLine: item.road_name_address };
    }

    if (item?.dong && !item?.ho) {
      return { firstLine: `${item.danji_name} ${item.dong}동`, secondLine: item.road_name_address };
    }

    if (!item?.dong && item?.ho) {
      return { firstLine: `${item.danji_name} ${item.ho}호`, secondLine: item.road_name_address };
    }

    return { firstLine: item.danji_name, secondLine: item.road_name_address };
  }

  if (item.dong && item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.dong}동 ${item.ho}호` };
  }

  if (item.dong && !item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.dong}동` };
  }

  if (!item.dong && item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.ho}호` };
  }

  return { firstLine: item.road_name_address, secondLine: '' };
}
