import useAPI_GetNoticeList from '@/apis/notice/getNoticeList';
import { NoticeList } from '@/components/templates';
import { useCallback, useMemo } from 'react';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '@/pages/_app';
import { MobileContainer } from '@/components/atoms';
import { MobGlobalHeader } from '@/components/organisms/MobGlobalHeader';

function NoticeListWrraper() {
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

  return <NoticeList notices={notices} onClickItem={handleClickItem} onNext={increamentPageNumber} />;
}

const Page: NextPageWithLayout = () => <NoticeListWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <MobileContainer>
      <MobGlobalHeader title="공지사항" />
      {page}
    </MobileContainer>
  );
};

export default Page;
