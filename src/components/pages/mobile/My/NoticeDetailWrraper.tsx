import useAPI_GetNoticeDetail from '@/apis/notice/getNoticeDetail';
import { MobileContainer } from '@/components/atoms';

import Loading from '@/components/atoms/Loading';
import { NoticeDetail } from '@/components/templates';

import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';

export default function NoticeDetailWrraper() {
  const router = useRouter();

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
    router.replace(`/${Routes.EntryMobile}/${Routes.NoticeList}`);
  }, [router]);

  return isLoading ? (
    <Loading tw="mt-10" />
  ) : (
    <MobileContainer>
      <NoticeDetail
        title={title}
        createdTime={data?.createdTime ?? ''}
        descriptionHTML={data?.description ?? ''}
        onClickGoToList={handleGoToList}
        onClickBack={() => router.back()}
      />
    </MobileContainer>
  );
}
