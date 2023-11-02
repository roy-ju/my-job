import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { DanjiDetail } from '@/components/pages/mobile';
import { fetcher } from '@/lib/swr';
import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout<{ prefetchedData?: { [key: string]: any } | null }> = ({ prefetchedData }) => (
  <DanjiDetail prefetchedData={prefetchedData} />
);

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let danjiDetail: GetDanjiDetailResponse | null = null;

  if (context.query.danjiID) {
    const response: GetDanjiDetailResponse = await fetcher([
      '/danji/detail',
      { danji_id: Number(context.query.danjiID) },
    ]);

    if (response.danji_id) {
      danjiDetail = response;
    }
  }

  return {
    props: {
      ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
    },
  };
};

export default Page;
