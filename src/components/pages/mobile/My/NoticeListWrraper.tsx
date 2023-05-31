import useAPI_GetNoticeList from '@/apis/notice/getNoticeList';
import { MobileContainer } from '@/components/atoms';
import { NoticeList } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

export default function NoticeListWrraper() {
  const { data, increamentPageNumber } = useAPI_GetNoticeList();
  const router = useRouter();

  const notices = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.category ? `[${item.category}] ${item.title}` : item.title,
        createdTime: item.created_time,
      })),
    [data],
  );

  const handleClickItem = useCallback(
    (id: number) => {
      router.push(
        { pathname: `/${Routes.EntryMobile}/${Routes.NoticeDetail}`, query: { noticeID: `${id}` } },
        `/${Routes.EntryMobile}/${Routes.NoticeDetail}?noticeID=${id}`,
      );
    },
    [router],
  );

  return (
    <MobileContainer>
      <NoticeList
        onClickBack={() => router.back()}
        notices={notices}
        onClickItem={handleClickItem}
        onNext={increamentPageNumber}
      />
    </MobileContainer>
  );
}
