import Routes from '@/router/routes';

export type UserEventType = {
  category: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  pcLink: string;
  mobileLink: string;
};

export const UserEventList: UserEventType[] = [
  {
    category: '이벤트',

    title: '앱 리뷰쓰고 스타벅스 받자! ☘️',

    startDate: new Date('2024-05-10T00:00:00'),

    endDate: new Date('2024-05-24T00:00:00'),

    pcLink: `/${Routes.My}/${Routes.NoticeDetail}?noticeID=9`,

    mobileLink: `/${Routes.EntryMobile}/${Routes.NoticeDetail}?noticeID=9`,
  },
];
