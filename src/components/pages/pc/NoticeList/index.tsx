import useAPI_GetNoticeList from '@/apis/notice/getNoticeList';
import { Panel } from '@/components/atoms';
import { NoticeList } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const { data, increamentPageNumber } = useAPI_GetNoticeList();

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
      router.replace(Routes.NoticeDetail, { searchParams: { noticeID: `${id}` } });
    },
    [router],
  );

  return (
    <Panel width={panelWidth}>
      <NoticeList notices={notices} onClickItem={handleClickItem} onNext={increamentPageNumber} />
    </Panel>
  );
});
