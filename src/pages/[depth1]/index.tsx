import { GetServerSideProps } from 'next';

import { NextPageWithLayout } from '@/pages/_app';

import Router from '@/router';

import { MapLayout } from '@/layouts';

import fetcher from '@/lib/swr/fetcher';

import { DanjiDetailResponse } from '@/services/danji/types';

import { checkPlatform } from '@/utils/checkPlatform';

import getHtmlMetas from '@/utils/getHtmlMetas';

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

  const userAgent = context.req.headers['user-agent'];

  const platform = checkPlatform(userAgent);

  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  let danjiDetail: DanjiDetailResponse | null = null;

  if (context.query.danjiID) {
    const response: DanjiDetailResponse = await fetcher(['/danji/detail', { danji_id: Number(context.query.danjiID) }]);

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
      platform,
      depth: 1,
      ...(danjiDetail ? { prefetchedData: danjiDetail } : {}),
    },
  };
};

export default Page;
