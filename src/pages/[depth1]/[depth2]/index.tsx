import { NextPageWithLayout } from '@/pages/_app';
import { GetServerSideProps } from 'next';

import { MapLayout } from '@/layouts';
import PrevPage from '@/pages/[depth1]';
import Router from '@/router';
import getHtmlMetas from '@/utils/getHtmlMetas';

const Page: NextPageWithLayout = () => null;

Page.getComponent = function getComponent(pageProps) {
  return <Router key={pageProps.route} {...pageProps} />;
};

Page.getLayout = function getLayout(page, pageProps) {
  return (
    <MapLayout>
      {PrevPage.getComponent?.({
        query: pageProps.query,
        route: pageProps.query.depth1,
        depth: 1,
      })}
      {page}
    </MapLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const metas = await getHtmlMetas(context.query);

  const forwarded = context.req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  const userAgent = context.req.headers['user-agent'];
  if (userAgent && userAgent.indexOf('Mobi') > -1) {
    // 모바일이라면
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...metas,
      ipAddress: ip ?? null,
      query: context.query,
      route: context.query.depth2,
      depth: 2,
    },
  };
};

export default Page;
