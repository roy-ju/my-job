import useAPI_GetNoticeDetail from '@/apis/notice/getNoticeDetail';
import { Loading, Panel } from '@/components/atoms';
import { NoticeDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback, useMemo } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const noticeID = useMemo(() => Number(router.query.noticeID), [router.query]);
  const { data, isLoading } = useAPI_GetNoticeDetail(noticeID);

  const title = useMemo(() => {
    if (data) {
      if (data.category) {
        return `[${data.category}] ${data.title}`;
      }
      return data.title;
    }
    return '';
  }, [data]);

  const handleGoToList = useCallback(() => {
    router.replace(Routes.NoticeList);
  }, [router]);

  return (
    <Panel width={panelWidth}>
      {isLoading ? (
        <Loading tw="mt-10" />
      ) : (
        <NoticeDetail
          title={title}
          createdTime={data?.createdTime ?? ''}
          descriptionHTML={data?.description ?? ''}
          onClickGoToList={handleGoToList}
        />
      )}
    </Panel>
  );
});
