import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { MapLayout } from '@/layouts';
import { fetcher } from '@/lib/swr';
import { NextPageWithLayout } from '@/pages/_app';
import Router from '@/router';
import getHtmlMetas from '@/utils/getHtmlMetas';
import { GetServerSideProps } from 'next';

const Page: NextPageWithLayout = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <Router key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const metas = await getHtmlMetas(context.query);
  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

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
      ...metas,
      ipAddress: ip ?? null,
      query: context.query,
      route: context.query.depth1,
      depth: 1,
      ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
    },
  };
};

export default Page;
