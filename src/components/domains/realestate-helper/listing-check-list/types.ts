import { GuideListItem } from '@/services/sub-home/types';

export type ListType = { code: string; additionalList: GuideListItem[]; requiredList: GuideListItem[] }[];

export type ConvertedList = {
  code: string;
  additionalList: GuideListItem[];
  requiredList: GuideListItem[];
}[];
