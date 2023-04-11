import useAPI_GetNoticeList from '@/apis/notice/getNoticeList';
import { MobNoticeList } from '@/components/templates';
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

  const handleClickItem = useCallback((id: number) => router.push(`${Routes.NoticeDetail}/${id}`), [router]);

  return <MobNoticeList notices={notices} onClickItem={handleClickItem} onNext={increamentPageNumber} />;
}
