import { RealestateDocumentListItem } from '@/services/sub-home/types';

export default function makeTitle({ item }: { item: RealestateDocumentListItem }) {
  if (item?.danji_name) {
    if (item?.dong && item?.ho) {
      return { firstLine: `${item.danji_name} ${item.dong} ${item.ho}`, secondLine: item.road_name_address };
    }

    if (item?.dong && !item?.ho) {
      return { firstLine: `${item.danji_name} ${item.dong}`, secondLine: item.road_name_address };
    }

    if (!item?.dong && item?.ho) {
      return { firstLine: `${item.danji_name} ${item.ho}`, secondLine: item.road_name_address };
    }

    return { firstLine: item.danji_name, secondLine: item.road_name_address };
  }

  if (item.dong && item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.dong} ${item.ho} ` };
  }

  if (item.dong && !item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.dong}` };
  }

  if (!item.dong && item.ho) {
    return { firstLine: item.road_name_address, secondLine: `${item.ho}` };
  }

  return { firstLine: item.road_name_address, secondLine: '' };
}
